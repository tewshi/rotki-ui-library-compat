<script lang="ts" setup>
import { useCssModule } from 'vue';
import {
  RuiButton,
  RuiButtonGroup,
  RuiIcon,
  ThemeMode,
  useRotkiTheme,
} from '@rotki/ui-library-compat';

const css = useCssModule();
const { switchThemeScheme, store } = useRotkiTheme();

interface Theme {
  name: string;
  value: ThemeMode;
  icon: string;
}

const themes: Theme[] = [
  { name: 'Light', value: ThemeMode.light, icon: 'sun-line' },
  { name: 'Dark', value: ThemeMode.dark, icon: 'moon-line' },
  { name: 'System', value: ThemeMode.auto, icon: 'macbook-line' },
];

const onSwitchTheme = ({ value }: Theme) => switchThemeScheme(value);
</script>

<template>
  <header :class="css.header">
    <div :class="css['header-wrapper']" class="wrapper">
      <RouterLink
        :to="{ name: 'buttons' }"
        aria-label="Home page"
        class="flex items-center space-x-3"
      >
        <img alt="rotki" class="h-8" src="../assets/logo.png" />
      </RouterLink>
      <div
        class="relative flex basis-0 justify-end gap-6 sm:gap-8 md:flex-grow"
      >
        <span class="sr-only">Theme</span>
        <RuiButtonGroup :value="store" variant="outlined">
          <RuiButton
            v-for="theme in themes"
            :key="theme.value"
            :value="theme.value"
            @click="onSwitchTheme(theme)"
          >
            <RuiIcon :name="theme.icon" :size="16" />
          </RuiButton>
        </RuiButtonGroup>
      </div>
    </div>
  </header>
</template>

<style lang="scss" module>
.header {
  @apply sticky top-0 z-50 flex flex-wrap items-center bg-white shadow-md shadow-slate-900/5;
  @apply transition duration-500 py-5;
}

.header-wrapper {
  @apply flex flex-wrap items-center justify-between;
}

.toggle {
  @apply flex h-6 w-6 items-center justify-center rounded-lg shadow-md shadow-black/5 ring-1 ring-black/5;
}

.toggle-icon {
  @apply h-4 w-4 fill-sky-400;

  &.light {
    @apply block;
  }

  &.dark {
    @apply hidden;
  }
}

.options {
  @apply absolute left-1/2 top-full mt-3 w-36 -translate-x-3/4 space-y-1 rounded-xl bg-white p-3;
  @apply text-sm font-medium shadow-md shadow-black/5 ring-1 ring-black/5;

  .option {
    @apply flex cursor-pointer select-none items-center rounded-[0.625rem] p-1;
  }

  .option:not(.selected):not(.active) {
    @apply text-slate-700;
  }

  .option.active:not(.selected) {
    @apply text-slate-900;
  }

  .option-wrapper {
    @apply rounded-md bg-white p-1 shadow ring-1 ring-slate-900/5;
  }

  .selected {
    @apply text-sky-500;
  }

  .active {
    @apply bg-slate-100;
  }

  .option-selected-icon {
    @apply fill-sky-400;
  }
}

:global(.dark) {
  .header {
    @apply bg-slate-900 shadow-none;
  }

  .toggle {
    @apply bg-slate-700 ring-inset ring-white/5;
  }

  .toggle-icon {
    &.light {
      @apply hidden;
    }

    &.dark {
      @apply block;
    }
  }

  .options {
    @apply bg-slate-800 ring-white/5;

    .option:not(.selected):not(.active) {
      @apply text-slate-400;
    }

    .option.active:not(.selected) {
      @apply text-white;
    }

    .option-wrapper {
      @apply bg-slate-700 ring-inset ring-white/5;
    }

    .selected {
      @apply text-sky-500;
    }

    .active {
      @apply bg-slate-900/40;
    }

    .option-selected-icon {
      @apply fill-sky-400;
    }
  }
}
</style>
