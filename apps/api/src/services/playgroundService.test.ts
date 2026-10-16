import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("../utils/ssrfGuard.js", () => ({
  assertUrlIsSafe: vi.fn(async (url: string) => new URL(url)),
}));

import { runExecuteRequest } from "./playgroundService.js";

const fetchMock = vi.fn();
const MAX_BYTES = 2 * 1024 * 1024;

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("runExecuteRequest", () => {
  it("rejects unsupported methods without calling fetch", async () => {
    await expect(
      runExecuteRequest({
        method: "TRACE",
        url: "https://example.com",
        headers: {},
        body: "",
      }),
    ).rejects.toThrow(/Unsupported method/);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("never follows redirects", async () => {
    fetchMock.mockResolvedValue(new Response("ok", { status: 200 }));
    await runExecuteRequest({
      method: "GET",
      url: "https://example.com",
      headers: {},
      body: "",
    });
    expect(fetchMock).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ redirect: "manual" }),
    );
  });

  it("omits the body for GET requests", async () => {
    fetchMock.mockResolvedValue(new Response("ok", { status: 200 }));
    await runExecuteRequest({
      method: "GET",
      url: "https://example.com",
      headers: {},
      body: "should be ignored",
    });
    const [, options] = fetchMock.mock.calls[0];
    expect(options.body).toBeUndefined();
  });

  it("sends a body for POST requests", async () => {
    fetchMock.mockResolvedValue(new Response("ok", { status: 201 }));
    const result = await runExecuteRequest({
      method: "POST",
      url: "https://example.com",
      headers: {},
      body: '{"a":1}',
    });
    const [, options] = fetchMock.mock.calls[0];
    expect(options.body).toBe('{"a":1}');
    expect(result.status).toBe(201);
  });

  it("caps the response body and flags truncation", async () => {
    const huge = "x".repeat(MAX_BYTES + 5000);
    fetchMock.mockResolvedValue(new Response(huge, { status: 200 }));
    const result = await runExecuteRequest({
      method: "GET",
      url: "https://example.com",
      headers: {},
      body: "",
    });
    expect(result.truncated).toBe(true);
    expect(result.body.endsWith("[truncated]")).toBe(true);
    expect(result.sizeBytes).toBeLessThanOrEqual(MAX_BYTES);
  });

  it("maps aborts to a timeout error", async () => {
    vi.useFakeTimers();
    fetchMock.mockImplementation(
      (_url: unknown, options: { signal: AbortSignal }) =>
        new Promise((_resolve, reject) => {
          options.signal.addEventListener("abort", () => {
            const err = new Error("aborted");
            err.name = "AbortError";
            reject(err);
          });
        }),
    );

    const promise = runExecuteRequest({
      method: "GET",
      url: "https://example.com",
      headers: {},
      body: "",
    });
    const assertion = expect(promise).rejects.toThrow(/timed out/);
    await vi.advanceTimersByTimeAsync(10_000);
    await assertion;
  });
});
