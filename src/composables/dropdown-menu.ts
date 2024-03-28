import type { Ref } from 'vue';
import type { MaybeElement } from '@vueuse/core';

export interface DropdownOptions<T, K> {
  options: Ref<T[]>;
  dense?: Ref<boolean>;
  value: Ref<T | null | undefined>;
  keyAttr: K;
  textAttr: K;
  appendWidth?: number;
  prependWidth?: number;
  itemHeight?: number;
  overscan?: number;
}

export function useDropdownMenu<T, K extends keyof T>({
  appendWidth,
  dense,
  itemHeight = 48,
  keyAttr,
  options,
  overscan = 1,
  prependWidth,
  textAttr,
  value,
}: DropdownOptions<T, K>) {
  const reference: Ref<MaybeElement | null> = ref(null);

  const { containerProps, list, scrollTo, wrapperProps } = useVirtualList<T>(
    options,
    {
      itemHeight,
      overscan,
    },
  );

  const renderedData: ComputedRef<T[]> = useArrayMap(list, ({ data }) => data);

  const isOpen = ref(false);

  const valueKey = computed(() => {
    const selected = get(value);
    return selected ? selected[keyAttr] : undefined;
  });

  const menuWidth = computed(() => {
    const widths = { max: 0, min: 0 };
    const maxWidth = 30;
    const paddingX = 1.5;
    const fontMultiplier = get(dense) ? 12 : 13;

    get(options).forEach((option) => {
      const length = getText(option)?.toString()?.length ?? 0;
      if (widths.min === 0 && widths.max === 0) {
        widths.min = length;
        widths.max = length;
      }
      else if (length < widths.min) {
        widths.min = length;
      }
      else if (length > widths.max) {
        widths.max = length;
      }
    });

    const difference = widths.max - widths.min;

    function computeValue(width: number) {
      const additionalWidths = (prependWidth ? prependWidth + 0.5 : 0) + (appendWidth ? appendWidth + 0.5 : 0);
      return `${Math.min((width * fontMultiplier) / 16 + paddingX + additionalWidths, maxWidth)}rem`;
    }

    if (difference <= 5)
      return computeValue(widths.max);

    return computeValue(widths.min + difference / 2);
  });

  function toggle(state: boolean = false) {
    set(isOpen, state);
  }

  function getText(item: T): T[K] {
    return item[textAttr];
  }

  function getIdentifier(item: T): T[K] {
    return item[keyAttr];
  }

  function isActiveItem(item: T): boolean {
    const selected = get(value);
    if (!selected)
      return false;

    return item[keyAttr] === selected[keyAttr];
  }

  function updateOpen(open: boolean) {
    if (open && get(value)) {
      nextTick(() => {
        scrollTo(get(options).findIndex(isActiveItem));
      });
    }
  }

  watch(isOpen, updateOpen);

  return {
    containerProps,
    getIdentifier,
    getText,
    isActiveItem,
    isOpen,
    menuWidth,
    reference,
    renderedData,
    scrollTo,
    toggle,
    valueKey,
    wrapperProps,
  };
}
