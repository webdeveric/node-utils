import { describe, it, expect, vi } from 'vitest';

import { deprecateProperty } from './deprecateProperty.js';

const getWarningPromise = <F extends (...args: any[]) => any>(fn: F): Promise<void> =>
  new Promise<void>(resolve => {
    process.once('warning', () => {
      fn();

      resolve();
    });
  });

describe('deprecateProperty()', () => {
  it('Deprecates a property on an object', async () => {
    const spy = vi.fn();

    const warningPromise = getWarningPromise(spy);

    const user = {
      name: 'Test Testerson',
      firstName: 'Test',
      lastName: 'Testerson',
    };

    deprecateProperty(user, 'name', '"name" is deprecated. Please use "firstName" and "lastName" properties');

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    user.name;

    await warningPromise;

    expect(spy).toHaveBeenCalled();
  });

  it('Deprecates a getter on an object', async () => {
    const spy = vi.fn();

    const warningPromise = getWarningPromise(spy);

    const time = {
      get now() {
        return Date.now();
      },
      get later() {
        return Date.now() + 10_000;
      },
    };

    deprecateProperty(time, 'now', '"now" is deprecated. Please use "later"');

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    time.now;

    await warningPromise;

    expect(spy).toHaveBeenCalled();
  });
});
