/* eslint-disable max-lines,import/max-dependencies */
import { type VueConstructor } from 'vue';
import { StepperState } from '@/types/stepper';
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

export const RuiPlugin = {
  install: (app: VueConstructor, options?: InitThemeOptions) => {
    const { registerIcons } = useIcons();
    registerIcons(options?.icons || []);
    useRotkiTheme().init({ ...options });
  },
};
