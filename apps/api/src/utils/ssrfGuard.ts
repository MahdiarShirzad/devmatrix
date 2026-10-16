import dns from "node:dns";
import net from "node:net";
import AppError from "./appError.js";

/**
 * SSRF guard shared by the API Playground.
 *
 * Blocks requests whose hostname or *resolved* address is loopback,
 * private, link-local, reserved, multicast, or cloud-metadata. Resolution
 * is done up front so a DNS name that points at an internal address is
 * rejected, not just a literal IP.
 */

interface BlockedV4Range {
  base: number;
  bits: number;
}

const BLOCKED_V4_RANGES: BlockedV4Range[] = [
  { base: 0x00000000, bits: 8 }, // 0.0.0.0/8 this network
  { base: 0x0a000000, bits: 8 }, // 10.0.0.0/8 private
  { base: 0x64400000, bits: 10 }, // 100.64.0.0/10 CGNAT
  { base: 0x7f000000, bits: 8 }, // 127.0.0.0/8 loopback
  { base: 0xa9fe0000, bits: 16 }, // 169.254.0.0/16 link-local + metadata
  { base: 0xac100000, bits: 12 }, // 172.16.0.0/12 private
  { base: 0xc0000000, bits: 24 }, // 192.0.0.0/24 IETF protocol assignments
  { base: 0xc0000200, bits: 24 }, // 192.0.2.0/24 TEST-NET-1
  { base: 0xc0a80000, bits: 16 }, // 192.168.0.0/16 private
  { base: 0xc6120000, bits: 15 }, // 198.18.0.0/15 benchmarking
  { base: 0xc6336400, bits: 24 }, // 198.51.100.0/24 TEST-NET-2
  { base: 0xcb007100, bits: 24 }, // 203.0.113.0/24 TEST-NET-3
  { base: 0xe0000000, bits: 4 }, // 224.0.0.0/4 multicast
  { base: 0xf0000000, bits: 4 }, // 240.0.0.0/4 reserved
  { base: 0xffffffff, bits: 32 }, // broadcast
];

const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "metadata",
  "metadata.google.internal",
  "instance-data",
  "169.254.169.254",
]);

export const ipv4ToInt = (ip: string): number | null => {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;

  let value = 0;
  for (const part of parts) {
    if (!/^\d{1,3}$/.test(part)) return null;
    const octet = Number(part);
    if (octet > 255) return null;
    value = (value << 8) + octet;
  }
  return value >>> 0;
};

const isBlockedV4 = (ip: string): boolean => {
  const value = ipv4ToInt(ip);
  if (value === null) return false;

  return BLOCKED_V4_RANGES.some(({ base, bits }) => {
    const mask =
      bits === 32 ? 0xffffffff : (~((1 << (32 - bits)) - 1) >>> 0) >>> 0;
    return (value & mask) === (base & mask);
  });
};

const ipv6ToBigInt = (ip: string): bigint | null => {
  let host = ip.split("%")[0].toLowerCase();
  if (!host.includes(":")) return null;

  // Expand an embedded IPv4 tail (e.g. ::ffff:192.168.0.1) to hex groups.
  if (host.includes(".")) {
    const lastColon = host.lastIndexOf(":");
    if (lastColon === -1) return null;
    const v4Part = host.slice(lastColon + 1);
    const v4 = ipv4ToInt(v4Part);
    if (v4 === null) return null;
    const high = ((v4 >>> 16) & 0xffff).toString(16);
    const low = (v4 & 0xffff).toString(16);
    host = `${host.slice(0, lastColon)}:${high}:${low}`;
  }

  const [left, right] = host.split("::");
  const leftGroups = left ? left.split(":") : [];
  const rightGroups = right ? right.split(":") : [];

  let groups: string[];
  if (host.includes("::")) {
    const missing = 8 - leftGroups.length - rightGroups.length;
    if (missing < 0) return null;
    groups = [
      ...leftGroups,
      ...Array.from({ length: missing }, () => "0"),
      ...rightGroups,
    ];
  } else {
    groups = host.split(":");
  }

  if (groups.length !== 8) return null;

  let result = 0n;
  for (const group of groups) {
    if (!/^[0-9a-f]{1,4}$/.test(group)) return null;
    result = (result << 16n) + BigInt(parseInt(group, 16));
  }
  return result;
};

const isBlockedV6 = (ip: string): boolean => {
  const value = ipv6ToBigInt(ip);
  if (value === null) return false;

  // ::1 loopback and :: unspecified.
  if (value === 0n || value === 1n) return true;

  // IPv4-mapped (::ffff:0:0/96): evaluate the embedded IPv4.
  const mappedPrefix = (value >> 32n) & 0xffffffffn;
  if (mappedPrefix === 0xffffn) {
    const low = Number(value & 0xffffffffn);
    const dotted = [
      (low >>> 24) & 0xff,
      (low >>> 16) & 0xff,
      (low >>> 8) & 0xff,
      low & 0xff,
    ].join(".");
    return isBlockedV4(dotted);
  }

  if ((value >> 121n) === 0x7en) return true; // fc00::/7 unique local
  if ((value >> 118n) === 0x3fan) return true; // fe80::/10 link-local
  if ((value >> 120n) === 0xffn) return true; // ff00::/8 multicast
  if ((value >> 96n) === 0x20010db8n) return true; // 2001:db8::/32 docs

  return false;
};

export const isBlockedIp = (ip: string): boolean => {
  if (net.isIPv4(ip)) return isBlockedV4(ip);
  if (net.isIPv6(ip)) return isBlockedV6(ip);
  return true; // unknown format -> fail closed
};

export const isBlockedHostname = (hostname: string): boolean => {
  const normalized = hostname.trim().toLowerCase().replace(/\.$/, "");
  if (!normalized) return true;
  if (BLOCKED_HOSTNAMES.has(normalized)) return true;
  if (normalized.endsWith(".localhost") || normalized.endsWith(".internal")) {
    return true;
  }
  return false;
};

/**
 * Validates a URL and every address its hostname resolves to. Returns the
 * parsed URL so callers can reuse it.
 */
export const assertUrlIsSafe = async (rawUrl: unknown): Promise<URL> => {
  if (typeof rawUrl !== "string" || rawUrl.trim().length === 0) {
    throw new AppError("Invalid URL", 400);
  }

  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    throw new AppError("Invalid URL", 400);
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new AppError("Only http and https URLs are allowed", 400);
  }

  const hostname = parsed.hostname;

  if (isBlockedHostname(hostname)) {
    throw new AppError(
      "Requests to private or internal addresses are not allowed",
      400,
    );
  }

  // A literal IP can be checked directly; a hostname must be resolved.
  if (net.isIP(hostname)) {
    if (isBlockedIp(hostname)) {
      throw new AppError(
        "Requests to private or internal addresses are not allowed",
        400,
      );
    }
    return parsed;
  }

  let addresses: dns.LookupAddress[];
  try {
    addresses = await dns.promises.lookup(hostname, { all: true });
  } catch {
    throw new AppError("Could not resolve the request hostname", 400);
  }

  if (addresses.length === 0) {
    throw new AppError("Could not resolve the request hostname", 400);
  }

  if (addresses.some((entry) => isBlockedIp(entry.address))) {
    throw new AppError(
      "Requests to private or internal addresses are not allowed",
      400,
    );
  }

  return parsed;
};
