import DOMPurify from "dompurify";

export function sanitize(dirty: string): string {
  if (typeof window === "undefined") {
    // Server-side: return as-is since DOMPurify requires a DOM.
    // Sanitization will happen on the client after hydration.
    return dirty;
  }
  return DOMPurify.sanitize(dirty);
}