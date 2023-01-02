import { resolve4, resolve6 } from 'node:dns/promises';
import { isIP } from 'node:net';

export async function hostnameResolvesToIp(hostname: string, ip: string): Promise<boolean> {
  const ipVersion = isIP(ip);

  if (!ipVersion) {
    throw new Error(`Invalid IP: ${ip}`);
  }

  const resolve = ipVersion === 4 ? resolve4 : resolve6;

  const resolved = await resolve(hostname);

  return resolved.some(addr => addr === ip);
}
