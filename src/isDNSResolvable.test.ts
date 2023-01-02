import { describe, expect, it, vi } from 'vitest';

import { isDNSResolvable } from './isDNSResolvable';

vi.mock('node:dns/promises', () => {
  return {
    resolve: vi
      .fn(async () => ['0.0.0.1'])
      .mockImplementationOnce(async () => {
        throw new Error('resolve error');
      }),
    lookup: vi
      .fn(async () => [{ address: '0.0.0.2', family: 4 }])
      .mockImplementationOnce(async () => {
        throw new Error('lookup error');
      }),
  };
});

describe('isDNSResolvable()', () => {
  it('Returns boolean indicating if name is resolvable', async () => {
    await expect(isDNSResolvable('bad.example.com')).resolves.toBeFalsy();
    await expect(isDNSResolvable('good.example.com')).resolves.toBeTruthy();
  });
});
