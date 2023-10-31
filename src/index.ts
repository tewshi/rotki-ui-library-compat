/* eslint-disable max-lines,import/max-dependencies */
import Vue, { type VueConstructor } from 'vue';
import { isClient } from '@vueuse/core';
import { StepperState } from '@/types/stepper';
import { createTeleport } from '@/components/overlays/teleport-container';
import type { InitThemeOptions } from '@/types/theme';
import '@/style.scss';

export * from '@/all-icons';

export {
  type InitThemeOptions,
  type ThemeConfig,
  type ThemeContent,
  type ThemeData,
  ThemeMode,
} from '@/types/theme';

export { type ContextColorsType } from '@/consts/colors';

export * from '@/composables';
export * from '@/components';

export { StepperState };

const installTeleport = () => {
  if (!isClient) {
    return;
  }

  const teleport = createTeleport();
  Object.defineProperty(Vue.prototype, '$teleport', {
    get() {
      return teleport;
    },
  });
};

export const RuiPlugin = {
  install: (app: VueConstructor, options?: InitThemeOptions) => {
    const { registerIcons } = useIcons();
    registerIcons(options?.icons || []);
    useRotkiTheme().init({ ...options });
    installTeleport();
  },
};
