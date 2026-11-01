const APPROVED_EXTERNAL = new Set([
  "https://teregonlabs.com",
  "https://www.teregonlabs.com",
  "https://www.eria.co",
  "https://eria.co",
  "https://www.w3sourcing.com",
  "https://w3sourcing.com",
  "https://openrouter.ai",
]);

export type GuideSegment = { text: string; href?: string };

function safeHref(raw: string): string | null {
  if (!raw || /[\\\u0000-\u001f]/.test(raw)) return null;
  if (raw.startsWith("/") && !raw.startsWith("//")) return raw;
  if (raw.startsWith("#")) return raw;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return null;
    if (url.origin === "https://openrouter.ai" && url.pathname === "/privacy") return url.href;
    if (APPROVED_EXTERNAL.has(url.origin)) return url.href;
  } catch {
    return null;
  }
  return null;
}

/** Parse simple Markdown links while leaving HTML and unapproved destinations as text. */
export function safeGuideLinks(input: string): GuideSegment[] {
  const source = String(input || "");
  const parts: GuideSegment[] = [];
  const pattern = /\[([^\]\n]{1,160})\]\(([^\s)]+)\)|(https:\/\/[^\s<>()]+|\/(?!\/)[A-Za-z0-9._~!$&'()*+,;=:@%/?#-]*|#[A-Za-z0-9_-]+)/g;
  let cursor = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(source))) {
    if (match.index > cursor) parts.push({ text: source.slice(cursor, match.index) });
    const markdown = Boolean(match[1]);
    const raw = markdown ? match[2] : match[3];
    const trailing = raw.match(/[.,!?;:]+$/)?.[0] || "";
    const candidate = trailing ? raw.slice(0, -trailing.length) : raw;
    const href = safeHref(candidate);
    if (href) parts.push({ text: markdown ? match[1] : candidate, href });
    else parts.push({ text: markdown ? match[0] : candidate });
    if (trailing) parts.push({ text: trailing });
    cursor = pattern.lastIndex;
  }
  if (cursor < source.length) parts.push({ text: source.slice(cursor) });
  return parts;
}

export function getGuideErrorMessage(code?: string, retryAfter?: number | string): string {
  if (code === "rate_limited") {
    const seconds = Number(retryAfter);
    if (Number.isInteger(seconds) && seconds > 0 && seconds <= 3600) {
      return `The Guide is receiving too many questions. Wait about ${seconds} seconds, then try your question again.`;
    }
    return "The Guide is receiving too many questions. Wait a little, then try your question again.";
  }
  if (code === "invalid_request") return "That question could not be sent. Shorten it and try again.";
  if (code === "request_too_large") return "That question is too long. Shorten it and try again.";
  if (code === "forbidden") return "This request could not be verified. Reload the page and try your question again.";
  return "The Guide is temporarily unavailable. Keep your question below and try again shortly.";
}

export type GuideStreamOptions = {
  onDelta?: (delta: string, accumulated: string) => void;
  onDone?: (text: string) => void;
  onError?: (error: Error & { code?: string }) => void;
  signal?: AbortSignal;
};

export async function parseGuideStream(stream: ReadableStream<Uint8Array>, options: GuideStreamOptions = {}): Promise<string> {
  const { onDelta = () => {}, onDone = () => {}, onError = () => {}, signal } = options;
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";
  let complete = false;
  const abortReader = () => { void reader.cancel?.(new DOMException("The operation was aborted.", "AbortError")); };
  signal?.addEventListener("abort", abortReader, { once: true });
  const processFrame = (frame: string) => {
    const data = frame.split(/\r?\n/).filter((line) => line.startsWith("data:")).map((line) => line.slice(5).replace(/^ /, "")).join("\n");
    if (!data) return;
    if (data.trim() === "[DONE]") {
      complete = true;
      onDone(text);
      return;
    }
    let payload: { error?: string | object; choices?: { delta?: { content?: unknown } }[] };
    try { payload = JSON.parse(data); }
    catch { return; }
    if (payload?.error) {
      const error = new Error("The Guide could not complete that response.") as Error & { code?: string };
      error.code = typeof payload.error === "string" ? payload.error : "unavailable";
      throw error;
    }
    const delta = payload?.choices?.[0]?.delta?.content;
    if (typeof delta === "string" && delta) {
      text += delta;
      onDelta(delta, text);
    }
  };
  try {
    if (signal?.aborted) throw new DOMException("The operation was aborted.", "AbortError");
    while (!complete) {
      const { value, done } = await reader.read();
      if (signal?.aborted) throw new DOMException("The operation was aborted.", "AbortError");
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let boundary: number;
      while ((boundary = buffer.search(/\r?\n\r?\n/)) !== -1) {
        const frame = buffer.slice(0, boundary);
        const separator = buffer.slice(boundary).match(/^\r?\n\r?\n/)?.[0] || "\n\n";
        buffer = buffer.slice(boundary + separator.length);
        processFrame(frame);
        if (complete) break;
      }
    }
    buffer += decoder.decode();
    if (!complete && buffer.trim()) processFrame(buffer);
    if (!complete) throw new Error("The Guide response ended before completion.");
    return text;
  } catch (error) {
    if ((error as Error)?.name !== "AbortError") onError(error as Error & { code?: string });
    throw error;
  } finally {
    try { reader.releaseLock?.(); } catch { /* reader already released */ }
    signal?.removeEventListener("abort", abortReader);
  }
}
