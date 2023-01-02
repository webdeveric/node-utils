import { reverse } from 'node:dns/promises';

import { hostnameResolvesToIp } from './hostnameResolvesToIp.js';

/**
 * Forward-confirmed reverse DNS
 *
 * @see https://en.wikipedia.org/wiki/Forward-confirmed_reverse_DNS
 */
export async function fcrdns(hostname: string, ip: string): Promise<boolean> {
  const hostnames = await reverse(ip);

  if (!hostnames.length) {
    throw new Error(`Unable to get hostnames for ${ip}`);
  }

  if (!hostnames.every(name => name.endsWith(hostname))) {
    throw new Error(`${ip} does not belong to ${hostname}`);
  }

  const results = await Promise.all(hostnames.map(name => hostnameResolvesToIp(name, ip)));

  return results.some(val => val);
}
