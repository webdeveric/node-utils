import { describe, expect, it } from 'vitest';

import { getSRIHash } from './getSRIHash.js';

describe('getSRIHash()', () => {
  it('Returns a subresource integrity hash', async () => {
    await expect(getSRIHash('sha-256', '')).resolves.toEqual(expect.stringMatching(/^sha256-.+/));
  });

  it('Unrecognized algorithm name will throw', async () => {
    await expect(getSRIHash('sha256', '')).rejects.toThrow('Unrecognized algorithm');
  });
});
