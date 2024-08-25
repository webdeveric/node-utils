import { randomInt } from 'node:crypto';

export function getRandomItem(input: []): undefined;

export function getRandomItem<T>(input: T[]): T;

export function getRandomItem<T>(input: T[] | []): T | undefined {
  switch (input.length) {
    case 0:
      return;
    case 1:
      return input[0];
    default:
      return input[randomInt(0, input.length)];
  }
}
