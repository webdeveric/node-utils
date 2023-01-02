import { describe, expect, it } from 'vitest';

import { hash } from './hash.js';

describe('hash()', () => {
  it('hashes input', () => {
    expect(hash('md5', 'test')).toBe('098f6bcd4621d373cade4e832627b4f6');
  });
});
