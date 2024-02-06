import { describe, it, expect, vi } from 'vitest';

import { fcrdns } from './fcrdns';

vi.mock('node:dns/promises', () => {
  return {
    reverse: vi.fn(async () => ['example.com']).mockImplementationOnce(async () => []),
    resolve4() {
      return Promise.resolve(['0.0.0.1']);
    },
    resolve6() {
      return Promise.resolve(['::1']);
    },
  };
});

describe('fcrdns()', () => {
  it('Throws if reverse lookup fails', async () => {
    await expect(fcrdns('example.com', '::1')).rejects.toBeInstanceOf(Error);
  });

  it('validates an IP and hostname belong together', async () => {
    await expect(fcrdns('example.com', '::1')).resolves.toBe(true);
    await expect(fcrdns('example.com', '0.0.0.1')).resolves.toBe(true);
    await expect(fcrdns('localhost', '127.0.0.1')).rejects.toBeInstanceOf(Error);
  });
});
