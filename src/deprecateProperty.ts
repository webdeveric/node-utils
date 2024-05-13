import { deprecate } from 'node:util';

export function deprecateProperty<Type extends Record<PropertyKey, unknown>, Property extends keyof Type>(
  object: Type,
  property: Property,
  message: string,
  code?: string,
): void {
  const descriptor = Object.getOwnPropertyDescriptor(object, property);

  if (descriptor) {
    Object.defineProperty(object, property, {
      get: deprecate(
        () => {
          return typeof descriptor.get === 'function' ? descriptor.get() : descriptor.value;
        },
        message,
        code,
      ),
    });
  }
}
