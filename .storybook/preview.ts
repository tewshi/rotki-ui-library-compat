import '../src/style.scss';
import './preview.scss';
import '@fontsource/roboto/latin.css';

import { useEffect, useGlobals } from '@storybook/addons';
import { useRotkiTheme } from '../src';
import { vueInstance } from './app';
import type { Preview } from '@storybook/vue';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    vueInstance: {
      defaultValue: vueInstance,
      control: { type: 'object' },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'auto',
      toolbar: {
        // The label to show for this toolbar item
        title: 'Theme',
        icon: 'circlehollow',
        // Array of plain string values or MenuItem shape (see below)
        items: [
          { value: 'auto', title: 'Auto' },
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        // Change title based on selected value
        dynamicTitle: true,
      },
    },
  },
  decorators: [function (story) {
    const [{ theme }] = useGlobals();
    const { switchThemeScheme } = useRotkiTheme();

    useEffect(() => {
      switchThemeScheme(theme);
    }, [theme]);

    return story();
  }],
};

export default preview;
