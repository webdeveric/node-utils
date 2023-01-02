import { type BinaryLike, type BinaryToTextEncoding, createHash } from 'node:crypto';

export function hash(algorithm: string, data: BinaryLike, encoding: BinaryToTextEncoding = 'hex'): string {
  return createHash(algorithm).update(data).digest(encoding);
}
