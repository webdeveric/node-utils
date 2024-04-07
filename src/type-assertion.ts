import assert from 'node:assert';

export function assertIsArrayWithLength<T>(input: unknown): asserts input is T[] {
  assert(Array.isArray(input) && input.length > 0, 'input is not an array with length greater than 0');
}
