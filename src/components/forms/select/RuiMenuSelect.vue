<script lang="ts" setup>
import { objectOmit } from '@vueuse/shared';
import RuiButton from '@/components/buttons/button/Button.vue';
import RuiIcon from '@/components/icons/Icon.vue';
import RuiMenu, { type MenuProps } from '@/components/overlays/menu/Menu.vue';
import { useDropdownMenu } from '@/composables/dropdown-menu';

export type T = any;

export type K = keyof T;

export interface Props {
  options: T[];
  keyAttr: K;
  textAttr: K;
  value?: T | null;
  disabled?: boolean;
  dense?: boolean;
  fullWidth?: boolean;
  floatLabel?: boolean;
  clearable?: boolean;
  label?: string;
  menuOptions?: MenuProps;
  labelClass?: string;
  menuClass?: string;
  optionClass?: string;
  prependWidth?: number; // in rem
  appendWidth?: number; // in rem
  variant?: 'default' | 'filled' | 'outlined';
  hint?: string;
  errorMessages?: string | string[];
  successMessages?: string | string[];
  hideDetails?: boolean;
}

defineOptions({
  name: 'RuiMenuSelect',
});

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  dense: false,
  floatLabel: false,
  clearable: false,
  hideDetails: false,
  label: 'Select',
  menuOptions: () => ({
    popper: { placement: 'bottom-start' },
    closeOnContentClick: true,
  }),
  prependWidth: 0,
  appendWidth: 0,
  variant: 'default',
  hint: undefined,
  errorMessages: () => [],
  successMessages: () => [],
});

const emit = defineEmits<{
  (e: 'input', value?: T | null): void;
}>();

const css = useCssModule();

const { options, dense } = toRefs(props);

const value = computed({
  get: () => props.value,
  set: selected => emit('input', selected),
});

const labelWithQuote = computed(() => {
  if (!props.label)
    return '"\\200B"';

  return `'  ${props.label}  '`;
});

const {
  containerProps,
  wrapperProps,
  renderedData,
  isOpen,
  valueKey,
  menuWidth,
  getText,
  getIdentifier,
  isActiveItem,
} = useDropdownMenu<T, K>({
  itemHeight: props.dense ? 30 : 48,
  keyAttr: props.keyAttr,
  textAttr: props.textAttr,
  options,
  dense,
  value,
});

const float = computed(() => (get(isOpen) || !!get(value)) && props.floatLabel);
</script>

<template>
  <RuiMenu
    v-model="isOpen"
    :class="css.wrapper"
    v-bind="{ ...menuOptions, errorMessages, successMessages, hint, dense, fullWidth }"
  >
    <template #activator="{ on, open, hasError, hasSuccess }">
      <slot
        name="activator"
        v-bind="{ disabled, value, variant, on, open, hasError, hasSuccess }"
      >
        <div
          :aria-disabled="disabled"
          :class="[
            css.activator,
            labelClass,
            {
              [css.disabled]: disabled,
              [css.outlined]: variant === 'outlined',
              [css.dense]: dense,
              [css.float]: float,
              [css['with-error']]: hasError,
              [css['with-success']]: hasSuccess && !hasError,
              'w-full': fullWidth,
            },
          ]"
          data-id="activator"
          v-on="disabled ? {} : on"
        >
          <span
            v-if="floatLabel || !value"
            :class="[
              css.label,
              {
                'absolute right-4': floatLabel,
                'pr-2': !value && !open && floatLabel,
                'left-4': floatLabel && !dense,
                'left-2': floatLabel && dense,
              },
            ]"
          >
            <slot
              name="activator.label"
              v-bind="{ value }"
            >
              {{ label }}
            </slot>
          </span>
          <span
            v-if="value"
            :class="css.value"
          >
            <slot
              name="activator.prepend"
              v-bind="{ value }"
            />
            <slot
              name="activator.text"
              v-bind="{ value }"
            >
              {{ getText(value) }}
            </slot>
          </span>

          <span
            v-if="clearable && value && !disabled"
            :class="css.clear"
            @click.stop.prevent="emit('input', null)"
          >
            <RuiIcon
              color="error"
              name="close-line"
              size="18"
            />
          </span>

          <span :class="css.icon__wrapper">
            <RuiIcon
              :class="[css.icon, { 'rotate-180': open }]"
              :size="dense ? 24 : 32"
              name="arrow-drop-down-fill"
            />
          </span>
        </div>
        <fieldset
          v-if="floatLabel"
          :class="css.fieldset"
        >
          <legend :class="{ 'px-2': float }" />
        </fieldset>
      </slot>
      <input
        :value="valueKey"
        class="hidden"
        type="hidden"
      />
    </template>
    <template #default="{ width }">
      <div
        :class="[css.menu, menuClass]"
        :style="{ width: fullWidth ? `${width / 16}rem` : menuWidth }"
        v-bind="objectOmit(containerProps, ['onScroll'])"
        @scroll="containerProps.onScroll"
      >
        <div v-bind="wrapperProps">
          <RuiButton
            v-for="(option, i) in renderedData"
            :key="i"
            :active="isActiveItem(option)"
            :size="dense ? 'sm' : undefined"
            :value="getIdentifier(option)"
            variant="list"
            @input="value = option"
          >
            <template #prepend>
              <slot
                name="item.prepend"
                v-bind="{ disabled, option, active: isActiveItem(option) }"
              />
            </template>
            <slot
              name="item.text"
              v-bind="{ disabled, option, active: isActiveItem(option) }"
            >
              {{ getText(option) }}
            </slot>
            <template #append>
              <slot
                name="item.append"
                v-bind="{ disabled, option, active: isActiveItem(option) }"
              />
            </template>
          </RuiButton>
        </div>
      </div>
    </template>
  </RuiMenu>
</template>

<style lang="scss" module>
.wrapper {
  @apply max-w-full w-full;

  .activator {
    @apply relative inline-flex items-center max-w-full;
    @apply outline-none focus:outline-none cursor-pointer min-h-12 pl-4 py-2 pr-8 rounded;
    @apply m-0 bg-white hover:bg-gray-50 transition text-body-1;

    &.dense {
      @apply pl-2 py-1 min-h-8 text-sm;

      ~ .fieldset {
        @apply px-1;
      }
    }

    &.disabled {
      @apply bg-black/[.12] text-rui-text-disabled active:text-rui-text-disabled cursor-default;
    }

    &.outlined {
      @apply border border-rui-text-disabled;

      &.disabled {
        @apply border-dashed;
      }

      &.with-success {
        @apply border-rui-success #{!important};

        ~ .fieldset {
          @apply border-rui-success #{!important};
        }
      }

      &.with-error {
        @apply border-rui-error #{!important};

        ~ .fieldset {
          @apply border-rui-error #{!important};
        }
      }
    }

    .label,
    .value {
      @apply block truncate transition-all duration-75;
    }

    .clear {
      @apply ml-auto shrink-0;
    }

    .icon {
      @apply text-rui-text transition;

      &__wrapper {
        @apply flex items-center justify-end;
        @apply absolute right-1 top-px bottom-0;
      }
    }

    &.float {
      &.outlined {
        @apply border-t-transparent;

        &.with-success {
          @apply border-t-transparent #{!important};
        }

        &.with-error {
          @apply border-t-transparent #{!important};
        }
      }

      .label {
        @apply -translate-y-2 top-0 text-xs;
      }

      ~ .fieldset {
        @apply border border-rui-text;

        legend {
          &:after {
            content: v-bind(labelWithQuote);
          }
        }
      }
    }
  }

  .fieldset {
    @apply absolute w-full min-w-0 h-[calc(100%+0.5rem)] top-0 left-0 rounded pointer-events-none px-2 -mt-2;

    legend {
      @apply opacity-0 text-xs max-w-full truncate;

      &:before {
        content: ' ';
      }

      &:after {
        @apply truncate max-w-full leading-[0];
        content: '\200B';
      }
    }
  }
}

.menu {
  @apply overflow-y-auto max-h-60 min-w-[2.5rem];
}

:global(.dark) {
  .wrapper {
    .activator {
      @apply bg-transparent hover:bg-white/10 text-rui-text;

      &.disabled {
        @apply bg-white/10;
      }

      &.outlined {
        @apply border border-rui-text hover:bg-white/[0.02];
      }

      &.float {
        &.outlined {
          @apply border-t-transparent;
        }

        ~ .fieldset {
          @apply border-white;
        }
      }
    }
  }
}
</style>
