/**
 * Webhook signature validation using SubtleCrypto API (browser-compatible).
 * 
 * This module uses the Web Crypto API instead of Node's crypto module
 * to ensure compatibility with both server and browser environments.
 * 
 * @param body - The raw request body string
 * @param signature - The x-signature header value from the webhook request
 * @param secret - The webhook secret configured in Mercado Pago dashboard
 * @returns boolean indicating if the signature is valid
 */
export async function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string
): Promise<boolean> {
  try {
    if (!signature || !secret) {
      return false;
    }

    const encoder = new TextEncoder();
    const secretKey = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      secretKey,
      encoder.encode(body)
    );

    const expected = arrayBufferToHex(signatureBuffer);
    
    // Timing-safe comparison
    if (signature.length !== expected.length) {
      return false;
    }
    
    return timingSafeCompare(signature, expected);
  } catch (error) {
    console.error("Erro ao verificar assinatura do webhook:", error);
    return false;
  }
}

/**
 * Converts ArrayBuffer to hexadecimal string
 */
function arrayBufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Timing-safe string comparison to prevent timing attacks.
 * 
 * @param a - First string to compare
 * @param b - Second string to compare
 * @returns boolean indicating if the strings are equal
 */
function timingSafeCompare(a: string, b: string): boolean {
  let result = 0;
  const len = Math.max(a.length, b.length);
  
  for (let i = 0; i < len; i++) {
    result |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  
  return result === 0;
}