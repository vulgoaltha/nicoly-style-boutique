import { createHmac } from "crypto";

/**
 * Verifies a Mercado Pago webhook signature.
 * @param body - The raw request body
 * @param signature - The x-signature header value
 * @param secret - The webhook secret from Mercado Pago
 * @returns boolean indicating if the signature is valid
 */
export function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  const hmac = createHmac("sha256", secret);
  hmac.update(body);
  const expected = hmac.digest("hex");
  return expected === signature;
}
