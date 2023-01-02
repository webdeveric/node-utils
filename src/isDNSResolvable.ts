import { lookup, resolve } from 'node:dns/promises';

import { assertIsArrayWithLength } from './type-assertion.js';

export const isDNSResolvable = (name: string): Promise<boolean> => {
  return resolve(name)
    .then(assertIsArrayWithLength, () => lookup(name))
    .then(
      () => true,
      () => false,
    );
};
