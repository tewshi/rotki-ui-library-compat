import { type ComponentPublicInstance } from 'vue';
import type { ThisTypedMountOptions, Wrapper } from '@vue/test-utils';

declare module '@vue/test-utils' {
  export function mount<V extends NonNullable<unknown>>(
    originalComponent: {
      new (...args: any[]): V;
    },
    options?: ThisTypedMountOptions<V>,
  ): Wrapper<ComponentPublicInstance<V>>;
}
