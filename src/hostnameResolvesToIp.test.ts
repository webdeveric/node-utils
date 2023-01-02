import { describe, it, expect, vi } from 'vitest';

import { hostnameResolvesToIp } from './hostnameResolvesToIp';

vi.mock('node:dns/promises', () => {
  return {
    resolve4() {
      return Promise.resolve(['0.0.0.1']);
    },
    resolve6() {
      return Promise.resolve(['::1']);
    },
  };
});

describe('hostnameResolvesToIp()', () => {
  it('Throws when given invalid IP', async () => {
    await expect(hostnameResolvesToIp('example.com', 'bad.ip.address')).rejects.toBeInstanceOf(Error);
  });

  it('Returns boolean indicating that the hostname resolves to the IP address', async () => {
    await expect(hostnameResolvesToIp('example.com', '::1')).resolves.toBe(true);
    await expect(hostnameResolvesToIp('example.com', '::2')).resolves.toBe(false);
    await expect(hostnameResolvesToIp('example.com', '0.0.0.1')).resolves.toBe(true);
  });
});
