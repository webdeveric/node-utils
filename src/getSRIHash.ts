import { subtle, type webcrypto } from 'node:crypto';

/**
 * Generate the subresource integrity hash
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
 */
export async function getSRIHash(
  algorithm: webcrypto.AlgorithmIdentifier,
  content: webcrypto.BufferSource | string,
): Promise<string> {
  const data = typeof content === 'string' ? new TextEncoder().encode(content) : content;

  const hashBuffer = await subtle.digest(algorithm, data);

  const base64Encoded = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));

  // Remove the dash since the allowed prefixes are currently sha256, sha384, and sha512.
  // https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity#using_subresource_integrity
  const prefix = (typeof algorithm === 'string' ? algorithm : algorithm.name).replace('-', '');

  return `${prefix}-${base64Encoded}`;
}
