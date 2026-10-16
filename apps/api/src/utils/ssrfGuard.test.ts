import { describe, it, expect, vi, beforeEach } from "vitest";

const { lookupMock } = vi.hoisted(() => ({ lookupMock: vi.fn() }));

vi.mock("node:dns", () => ({
  default: { promises: { lookup: lookupMock } },
}));

import {
  ipv4ToInt,
  isBlockedIp,
  isBlockedHostname,
  assertUrlIsSafe,
} from "../utils/ssrfGuard.js";

describe("ipv4ToInt", () => {
  it("converts dotted IPv4 to unsigned integers", () => {
    expect(ipv4ToInt("0.0.0.0")).toBe(0);
    expect(ipv4ToInt("127.0.0.1")).toBe(0x7f000001);
    expect(ipv4ToInt("255.255.255.255")).toBe(0xffffffff);
  });

  it("rejects malformed input", () => {
    expect(ipv4ToInt("1.2.3")).toBeNull();
    expect(ipv4ToInt("1.2.3.999")).toBeNull();
    expect(ipv4ToInt("1.2.3.a")).toBeNull();
  });
});

describe("isBlockedIp", () => {
  it.each([
    "0.0.0.0",
    "10.1.2.3",
    "100.64.0.1",
    "127.0.0.1",
    "169.254.169.254",
    "172.16.5.5",
    "192.168.1.1",
    "198.18.0.1",
    "224.0.0.1",
    "255.255.255.255",
  ])("blocks private/reserved IPv4 %s", (ip) => {
    expect(isBlockedIp(ip)).toBe(true);
  });

  it.each(["8.8.8.8", "1.1.1.1", "93.184.216.34", "172.32.0.1"])(
    "allows public IPv4 %s",
    (ip) => {
      expect(isBlockedIp(ip)).toBe(false);
    },
  );

  it.each(["::1", "::", "fc00::1", "fd12:3456::1", "fe80::1", "ff02::1"])(
    "blocks private/reserved IPv6 %s",
    (ip) => {
      expect(isBlockedIp(ip)).toBe(true);
    },
  );

  it("blocks IPv4-mapped loopback", () => {
    expect(isBlockedIp("::ffff:127.0.0.1")).toBe(true);
    expect(isBlockedIp("::ffff:10.0.0.1")).toBe(true);
  });

  it("allows public IPv4-mapped and global IPv6", () => {
    expect(isBlockedIp("::ffff:8.8.8.8")).toBe(false);
    expect(isBlockedIp("2606:4700:4700::1111")).toBe(false);
  });

  it("fails closed for unrecognized formats", () => {
    expect(isBlockedIp("not-an-ip")).toBe(true);
  });
});

describe("isBlockedHostname", () => {
  it.each([
    "localhost",
    "LOCALHOST",
    "foo.localhost",
    "metadata",
    "metadata.google.internal",
    "anything.internal",
  ])("blocks %s", (host) => {
    expect(isBlockedHostname(host)).toBe(true);
  });

  it.each(["example.com", "api.github.com", "localhost.example.com"])(
    "allows %s",
    (host) => {
      expect(isBlockedHostname(host)).toBe(false);
    },
  );
});

describe("assertUrlIsSafe", () => {
  beforeEach(() => {
    lookupMock.mockReset();
  });

  it("rejects non-http(s) protocols", async () => {
    await expect(assertUrlIsSafe("ftp://example.com")).rejects.toThrow(
      /Only http and https/,
    );
    await expect(assertUrlIsSafe("file:///etc/passwd")).rejects.toThrow();
  });

  it("rejects invalid/empty URLs", async () => {
    await expect(assertUrlIsSafe("")).rejects.toThrow(/Invalid URL/);
    await expect(assertUrlIsSafe("not a url")).rejects.toThrow(/Invalid URL/);
  });

  it("rejects literal private IPs without DNS lookup", async () => {
    await expect(assertUrlIsSafe("http://127.0.0.1:8080")).rejects.toThrow(
      /private or internal/,
    );
    await expect(
      assertUrlIsSafe("http://169.254.169.254/latest/meta-data"),
    ).rejects.toThrow(/private or internal/);
    expect(lookupMock).not.toHaveBeenCalled();
  });

  it("rejects blocked hostnames", async () => {
    await expect(assertUrlIsSafe("http://localhost/admin")).rejects.toThrow(
      /private or internal/,
    );
  });

  it("rejects hostnames that resolve to a private address", async () => {
    lookupMock.mockResolvedValue([{ address: "10.0.0.5", family: 4 }]);
    await expect(assertUrlIsSafe("http://evil.example.com")).rejects.toThrow(
      /private or internal/,
    );
  });

  it("allows hostnames that resolve to public addresses", async () => {
    lookupMock.mockResolvedValue([{ address: "93.184.216.34", family: 4 }]);
    const url = await assertUrlIsSafe("https://example.com/path?q=1");
    expect(url.hostname).toBe("example.com");
  });

  it("fails when DNS resolution throws", async () => {
    lookupMock.mockRejectedValue(new Error("ENOTFOUND"));
    await expect(assertUrlIsSafe("http://does-not-exist.test")).rejects.toThrow(
      /Could not resolve/,
    );
  });
});
