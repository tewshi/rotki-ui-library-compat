<script lang="ts" setup>
import { ref } from 'vue';
import { get, set } from '@vueuse/core';
import { type ChipProps, RuiChip } from '@rotki/ui-library-compat';

const dismissed = ref<Record<string | number, number>>({});

const chips = ref<ChipProps[]>([
  {
    disabled: false,
    color: 'primary',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'secondary',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'error',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'warning',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'info',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'success',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'primary',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'secondary',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'error',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'warning',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'info',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'success',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'primary',
    label: 'Chip',
    variant: 'filled',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'secondary',
    label: 'Chip',
    variant: 'filled',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'error',
    label: 'Chip',
    variant: 'filled',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'warning',
    label: 'Chip',
    variant: 'filled',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'info',
    label: 'Chip',
    variant: 'filled',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'success',
    label: 'Chip',
    variant: 'filled',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'primary',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'secondary',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'error',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'warning',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'info',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'success',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'primary',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'secondary',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'error',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'warning',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'info',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'success',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'primary',
    label: 'Chip',
    variant: 'filled',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'secondary',
    label: 'Chip',
    variant: 'filled',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'error',
    label: 'Chip',
    variant: 'filled',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'warning',
    label: 'Chip',
    variant: 'filled',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'info',
    label: 'Chip',
    variant: 'filled',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'success',
    label: 'Chip',
    variant: 'filled',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'primary',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'secondary',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'error',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'warning',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'info',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'success',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'primary',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'secondary',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'error',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'warning',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'info',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'success',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'primary',
    label: 'Chip',
    variant: 'outlined',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'secondary',
    label: 'Chip',
    variant: 'outlined',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'error',
    label: 'Chip',
    variant: 'outlined',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'warning',
    label: 'Chip',
    variant: 'outlined',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'info',
    label: 'Chip',
    variant: 'outlined',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'success',
    label: 'Chip',
    variant: 'outlined',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'primary',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'secondary',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'error',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'warning',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'info',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'success',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'primary',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'secondary',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'error',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'warning',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'info',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'success',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'primary',
    label: 'Chip',
    variant: 'outlined',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'secondary',
    label: 'Chip',
    variant: 'outlined',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'error',
    label: 'Chip',
    variant: 'outlined',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'warning',
    label: 'Chip',
    variant: 'outlined',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'info',
    label: 'Chip',
    variant: 'outlined',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'success',
    label: 'Chip',
    variant: 'outlined',
    dismissible: false,
  },
]);

const prependChips = ref<ChipProps[]>([
  {
    disabled: false,
    color: 'primary',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'secondary',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'error',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'warning',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'info',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'success',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'primary',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'secondary',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'error',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'warning',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'info',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'success',
    label: 'Chip',
    variant: 'filled',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'primary',
    label: 'Chip',
    variant: 'filled',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'secondary',
    label: 'Chip',
    variant: 'filled',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'error',
    label: 'Chip',
    variant: 'filled',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'warning',
    label: 'Chip',
    variant: 'filled',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'info',
    label: 'Chip',
    variant: 'filled',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'success',
    label: 'Chip',
    variant: 'filled',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'primary',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'secondary',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'error',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'warning',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'info',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'success',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'primary',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'secondary',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'error',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'warning',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'info',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'success',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'primary',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'secondary',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'error',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'warning',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'info',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'success',
    label: 'Chip',
    variant: 'filled',
    size: 'sm',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'primary',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'secondary',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'error',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'warning',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'info',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'success',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'primary',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'secondary',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'error',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'warning',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'info',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'success',
    label: 'Chip',
    variant: 'outlined',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'primary',
    label: 'Chip',
    variant: 'outlined',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'secondary',
    label: 'Chip',
    variant: 'outlined',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'error',
    label: 'Chip',
    variant: 'outlined',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'warning',
    label: 'Chip',
    variant: 'outlined',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'info',
    label: 'Chip',
    variant: 'outlined',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'success',
    label: 'Chip',
    variant: 'outlined',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'primary',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'secondary',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'error',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'warning',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'info',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'success',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'primary',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'secondary',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'error',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'warning',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'info',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: true,
    color: 'success',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: true,
  },
  {
    disabled: false,
    color: 'primary',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'secondary',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'error',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'warning',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'info',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: false,
  },
  {
    disabled: false,
    color: 'success',
    label: 'Chip',
    variant: 'outlined',
    size: 'sm',
    dismissible: false,
  },
]);

const onRemove = (identifier: number | string) => {
  const status = { ...get(dismissed) };
  if (!(identifier in status)) {
    status[identifier] = 0;
  }

  status[identifier]++;

  set(dismissed, status);
};
</script>

<template>
  <div>
    <h2 class="text-h4 mb-6" data-cy="chips">Chips</h2>
    <div class="grid gap-6 grid-cols-6">
      <div v-for="(chip, i) in chips" :key="i">
        <RuiChip :data-cy="`chip-${i}`" v-bind="chip" @remove="onRemove(i)" />
        <div v-if="dismissed[i]">{{ dismissed[i] }} times</div>
      </div>
    </div>
    <h2 class="text-h4 mb-6 mt-14" data-cy="chip">Chips with Prepend</h2>
    <div class="grid gap-6 grid-cols-6">
      <div v-for="(chip, i) in prependChips" :key="i">
        <RuiChip
          :data-cy="`pre-chip-${i}`"
          v-bind="chip"
          @remove="onRemove(`pre-${i}`)"
        >
          <template #prepend>
            <span>OP</span>
          </template>
        </RuiChip>
        <div v-if="dismissed[`pre-${i}`]">
          {{ dismissed[`pre-${i}`] }} times
        </div>
      </div>
    </div>
  </div>
</template>
