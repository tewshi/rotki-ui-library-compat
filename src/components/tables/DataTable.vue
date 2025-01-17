<script lang="ts" setup>
import Button from '@/components/buttons/button/Button.vue';
import Checkbox from '@/components/forms/checkbox/Checkbox.vue';
import Badge from '@/components/overlays/badge/Badge.vue';
import Icon from '@/components/icons/Icon.vue';
import Progress from '@/components/progress/Progress.vue';
import TablePagination, {
  type TablePaginationData,
} from './TablePagination.vue';

export interface TableColumn {
  key: string;
  sortable?: boolean;
  direction?: 'asc' | 'desc';
  align?: 'start' | 'center' | 'end';
  class?: string;
  cellClass?: string;
  [key: string]: any;
}

export interface SortColumn {
  column?: string;
  direction: 'asc' | 'desc';
}

export interface TableOptions {
  pagination?: TablePaginationData;
  sort?: SortColumn | SortColumn[];
}

export interface Props {
  /**
   * list of items for each row
   */
  rows: Array<Record<string, any>>;
  /**
   * the attribute used to identify each row uniquely for selection, usually `id`
   */
  rowAttr: string;
  /**
   * model for selected rows, add a v-model to support row selection
   */
  value?: string[];
  /**
   * model for internal searching
   */
  search?: string;
  /**
   * model for items per page
   * will be used if the `pagination` model isn't specified
   */
  itemsPerPage?: number;
  /**
   * model for paginating data
   * @example v-model:pagination="{ total: 10, limit: 5, page: 1 }"
   */
  pagination?: TablePaginationData;
  /**
   * modifiers for specifying externally paginated tables
   * use this when api controls pagination
   * @example v-model:pagination.external="{ total: 10, limit: 5, page: 1 }"
   */
  paginationModifiers?: {
    external: boolean;
  };
  /**
   * model for sort column/columns data
   * single column sort
   * @example v-model:sort="{ column: 'name', direction: 'asc' }"
   * multi columns sort
   * @example v-model:sort="[{ column: 'name', direction: 'asc' }]"
   */
  sort?: SortColumn | SortColumn[];
  /**
   * modifiers for specifying externally sorted tables
   * use this when api controls sorting
   * single column sort
   * @example v-model:sort.external="{ column: 'name', direction: 'asc' }"
   * multi columns sort
   * @example v-model:sort.external="[{ column: 'name', direction: 'asc' }]"
   */
  sortModifiers?: {
    external: boolean;
  };
  /**
   * list of column definitions
   */
  cols?: Array<TableColumn>;
  /**
   * attribute to use from column definitions to display column titles
   */
  columnAttr?: string;
  /**
   * flag to show a more or less spacious table
   */
  dense?: boolean;
  /**
   * flag to outline the flag with a border
   */
  outlined?: boolean;
  /**
   * flag to show loading state of the table
   * triggers indefinite progress at the bottom of the table header
   */
  loading?: boolean;
  /**
   * data to display for empty state
   * text and icon
   * @example :empty="{ icon: 'transactions-line', label: 'No transactions found' }"
   */
  empty?: {
    label?: string;
    description?: string;
  };

  rounded?: 'sm' | 'md' | 'lg';
  /**
   * should hide the footer
   */
  hideDefaultFooter?: boolean;
  /**
   * should add zebra-striping to the table row
   */
  striped?: boolean;
}

defineOptions({
  name: 'RuiDataTable',
});

const props = withDefaults(defineProps<Props>(), {
  value: undefined,
  search: '',
  cols: undefined,
  itemsPerPage: 10,
  pagination: undefined,
  columnAttr: 'label',
  sort: undefined,
  loading: false,
  dense: false,
  outlined: false,
  paginationModifiers: undefined,
  sortModifiers: undefined,
  empty: () => ({ label: 'No item found' }),
  rounded: 'md',
  hideDefaultFooter: false,
  striped: false,
});

const emit = defineEmits<{
  (e: 'input', value?: string[]): void;
  (e: 'update:pagination', value: TablePaginationData): void;
  (e: 'update:sort', value?: SortColumn | SortColumn[]): void;
  (e: 'update:options', value: TableOptions): void;
}>();

const {
  cols,
  rows,
  value,
  columnAttr,
  rowAttr,
  itemsPerPage,
  pagination,
  paginationModifiers,
  search,
  sort,
  loading,
  sortModifiers,
} = toRefs(props);

const css = useCssModule();

/**
 * Prepare the columns from props or generate using first item in the list
 */
const columns = computed(
  () =>
    get(cols) ??
    Object.keys(get(rows)[0] ?? {}).map((key) => ({
      key,
      [get(columnAttr)]: key,
      sortable: false,
      class: '',
    })),
);

const selectedData = computed({
  get() {
    return get(value);
  },
  set(value) {
    emit('input', value);
  },
});

const internalPaginationState: Ref<TablePaginationData | undefined> = ref();

watchImmediate(pagination, (pagination) => {
  set(internalPaginationState, pagination);
});

/**
 * Pagination is different for search
 * since search is only used for internal filtering
 * we return the length of search results as total
 */
const paginationData: Ref<TablePaginationData> = computed({
  get() {
    const paginated = get(internalPaginationState);
    if (!paginated) {
      return {
        total: get(searchData).length,
        limit: get(itemsPerPage),
        page: 1,
      };
    }

    return {
      total: get(searchData).length,
      limit: paginated.limit,
      page: paginated.page,
      limits: paginated.limits,
    };
  },
  set(value: TablePaginationData) {
    set(internalPaginationState, value);
    emit('update:pagination', value);
    emit('update:options', {
      pagination: value,
      sort: get(sort),
    });
  },
});

const sortData = computed({
  get() {
    return get(sort);
  },
  set(value) {
    emit('update:sort', value);
    emit('update:options', {
      sort: value,
      pagination: get(pagination),
    });
  },
});

/**
 * A mapping of the sort columns
 * for easily checking if a column is sorted instead of looping through the array
 */
const sortedMap = computed(() => {
  const mapped: Record<string, SortColumn> = {};
  const sortBy = get(sortData);
  if (!sortBy) {
    return mapped;
  }

  if (!Array.isArray(sortBy)) {
    if (sortBy.column) {
      mapped[sortBy.column] = sortBy;
    }
    return mapped;
  }

  return sortBy.reduce((acc, curr) => {
    if (!curr.column) {
      return acc;
    }

    return { ...acc, [curr.column]: curr };
  }, mapped);
});

/**
 * list if ids of the visible table rows used for check-all and uncheck-all
 */
const visibleIdentifiers = computed(() => {
  const selectBy = get(rowAttr);

  if (!selectBy) {
    return [];
  }

  return get(filtered)?.map((row) => row[selectBy]) ?? [];
});

/**
 * Flag to know when all rows are selected for the current screen
 */
const isAllSelected = computed(() => {
  const selectedRows = get(selectedData);
  if (!selectedRows) {
    return false;
  }

  return (
    selectedRows.length > 0 &&
    get(visibleIdentifiers).every((id) => selectedRows.includes(id))
  );
});

/**
 * rows filtered based on search query if it exists
 */
const searchData = computed(() => {
  const query = get(search)?.toLocaleLowerCase();
  if (!query) {
    return get(rows);
  }

  return get(rows).filter((row) =>
    Object.keys(row).some((key) =>
      `${row[key]}`.toLocaleLowerCase().includes(query),
    ),
  );
});

/**
 * sort the search results
 */
const sorted = computed(() => {
  const sortBy = get(sortData);
  const data = [...get(searchData)];
  if (!sortBy || get(sortModifiers)?.external) {
    return data;
  }

  const sortOptions: Intl.CollatorOptions = {
    numeric: true,
    ignorePunctuation: true,
  };

  const sort = (by: SortColumn) => {
    data.sort((a, b) => {
      const column = by.column;
      if (!column) {
        return 0;
      }
      if (by.direction === 'desc') {
        return `${b[column]}`.localeCompare(
          `${a[column]}`,
          undefined,
          sortOptions,
        );
      }

      return `${a[column]}`.localeCompare(
        `${b[column]}`,
        undefined,
        sortOptions,
      );
    });
  };

  if (!Array.isArray(sortBy)) {
    sort(sortBy);
  } else {
    sortBy.forEach(sort);
  }

  return data;
});

/**
 * comprises search, sorted and paginated data
 */
const filtered = computed(() => {
  const result = get(sorted);

  const paginated = get(paginationData);
  const limit = paginated.limit;
  if (paginated && !get(paginationModifiers)?.external) {
    const start = (paginated.page - 1) * limit;
    const end = start + limit;
    return result.slice(start, end);
  }

  return result;
});

const filteredMap = computed(() =>
  get(filtered).map((row) => row[get(rowAttr)]),
);

const indeterminate = computed(() => {
  const selectedRows = get(selectedData);
  if (!selectedRows) {
    return false;
  }
  return selectedRows.length > 0 && !get(isAllSelected);
});

const noData = computed(() => get(filtered).length === 0);

const isSortedBy = (key: string) => key in get(sortedMap);

const getSortIndex = (key: string) => {
  const sortBy = get(sortData);

  if (!sortBy || !Array.isArray(sortBy) || !isSortedBy(key)) {
    return -1;
  }

  return sortBy.findIndex((sort) => sort.column === key) ?? -1;
};

const isSelected = (identifier: string) => {
  const selection = get(selectedData);
  if (!selection) {
    return false;
  }

  return selection.includes(identifier);
};

/**
 * Sort to handle single sort or multiple sort columns
 */
const onSort = ({
  key,
  direction,
}: {
  key: string;
  direction?: 'asc' | 'desc';
}) => {
  const sortBy = get(sortData);
  if (!sortBy) {
    return;
  }

  if (!Array.isArray(sortBy)) {
    if (isSortedBy(key)) {
      const newDirection = !direction || direction === 'asc' ? 'desc' : 'asc';

      if (sortBy.direction === newDirection) {
        set(sortData, { ...sortBy, column: undefined, direction: 'asc' });
      } else {
        set(sortData, {
          ...sortBy,
          direction: sortBy.direction === 'asc' ? 'desc' : 'asc',
        });
      }
    } else {
      set(sortData, { column: key, direction: direction || 'asc' });
    }
    return;
  }

  if (isSortedBy(key)) {
    const newDirection = !direction || direction === 'asc' ? 'desc' : 'asc';

    const index = getSortIndex(key);
    const sortByCol = sortBy[index];

    if (sortByCol.direction === newDirection) {
      sortBy.splice(index, 1);
    } else {
      sortByCol.direction = sortByCol.direction === 'asc' ? 'desc' : 'asc';
    }
    set(sortData, sortBy);
  } else {
    set(sortData, [...sortBy, { column: key, direction: direction || 'asc' }]);
  }
};

/**
 * toggles selected rows
 * @param {boolean} checked checkbox state
 */
const onToggleAll = (checked: boolean) => {
  if (checked) {
    set(
      selectedData,
      Array.from(
        new Set([...(get(selectedData) ?? []), ...get(visibleIdentifiers)]),
      ),
    );
  } else {
    set(
      selectedData,
      get(selectedData)?.filter(
        (identifier) => !get(filteredMap).includes(identifier),
      ),
    );
  }
};

/**
 * toggles a single row
 * @param {boolean} checked checkbox state
 * @param {string} value the id of the selected row
 */
const onSelect = (checked: boolean, value: string) => {
  const selectedRows = get(selectedData);
  if (!selectedRows) {
    return false;
  }

  if (checked) {
    set(selectedData, [...selectedRows, value]);
  } else {
    set(
      selectedData,
      [...selectedRows].filter((r) => r !== value),
    );
  }
};

/**
 * on changing search query, need to reset pagination page to 1
 */
watch(search, () => {
  const pagination = get(paginationData);
  if (pagination) {
    pagination.page = 1;
  }
});

const slots = useSlots();
</script>

<template>
  <div
    :class="[
      css.wrapper,
      css[`rounded__${rounded}`],
      { [css.outlined]: outlined },
    ]"
  >
    <div :class="css.scroller">
      <table :class="[css.table, { [css.dense]: dense }]" aria-label="">
        <thead :class="css.thead">
          <tr :class="css.tr">
            <th v-if="selectedData" :class="css.checkbox" scope="col">
              <Checkbox
                :disabled="!filtered?.length"
                :indeterminate="indeterminate"
                :value="isAllSelected"
                color="primary"
                data-cy="table-toggle-check-all"
                hide-details
                @input="onToggleAll($event)"
              />
            </th>

            <th
              v-for="(column, index) in columns"
              :key="index"
              :class="[
                css.th,
                column.class,
                css[`align__${column.align ?? 'start'}`],
                {
                  capitalize: !cols,
                  [css.sortable]: column.sortable,
                },
              ]"
              scope="col"
            >
              <slot :column="column" :name="`header.${column.key}`">
                <Badge
                  v-if="column.sortable"
                  :value="getSortIndex(column.key) >= 0"
                  :text="`${getSortIndex(column.key) + 1}`"
                  color="secondary"
                  size="sm"
                >
                  <Button
                    :class="[
                      css.sort__button,
                      {
                        [css.sort__active]: isSortedBy(column.key),
                        [css[`sort__${sortedMap[column.key]?.direction}`]]:
                          isSortedBy(column.key),
                      },
                    ]"
                    size="sm"
                    variant="text"
                    @click="onSort(column)"
                  >
                    <span :class="css.column__text">
                      {{ column[columnAttr] }}
                    </span>

                    <template v-if="column.align === 'end'" #prepend>
                      <Icon
                        :class="css.sort__icon"
                        name="arrow-down-line"
                        size="18"
                      />
                    </template>

                    <template #append>
                      <Icon
                        v-if="column.align !== 'end'"
                        :class="css.sort__icon"
                        name="arrow-down-line"
                        size="18"
                      />
                    </template>
                  </Button>
                </Badge>
                <span v-else :class="css.column__text">
                  {{ column[columnAttr] }}
                </span>
              </slot>
            </th>
          </tr>
          <tr
            v-if="loading"
            :class="[
              css.thead__loader,
              { [css.thead__loader_linear]: !noData },
            ]"
          >
            <th
              :class="css.progress"
              :colspan="columns.length + (selectedData ? 1 : 0)"
              scope="col"
            >
              <div :class="css.progress__wrapper">
                <Progress
                  :circular="noData"
                  color="primary"
                  variant="indeterminate"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody :class="[css.tbody, { [css['tbody--striped']]: striped }]">
          <tr
            v-for="(row, index) in filtered"
            :key="index"
            :class="[css.tr, { [css.tr__selected]: isSelected(row[rowAttr]) }]"
          >
            <td v-if="selectedData" :class="css.checkbox">
              <Checkbox
                :data-cy="`table-toggle-check-${index}`"
                :value="isSelected(row[rowAttr])"
                color="primary"
                hide-details
                @input="onSelect($event, row[rowAttr])"
              />
            </td>

            <td
              v-for="(column, subIndex) in columns"
              :key="subIndex"
              :class="[
                css.td,
                column.cellClass,
                css[`align__${column.align ?? 'start'}`],
              ]"
            >
              <slot
                :column="column"
                :index="index"
                :name="`item.${column.key}`"
                :row="row"
              >
                {{ row[column.key] }}
              </slot>
            </td>
          </tr>
          <tr
            v-if="noData && empty && !loading"
            :class="[css.tr, css.tr__empty]"
          >
            <Transition
              appear
              enter-active-class="transition ease-out duration-200 delay-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <td
                :class="css.td"
                :colspan="columns.length + (selectedData ? 1 : 0)"
              >
                <slot name="no-data">
                  <div :class="css.empty">
                    <p v-if="empty.label" :class="css.empty__label">
                      {{ empty.label }}
                    </p>

                    <slot name="empty-description">
                      <p
                        v-if="empty.description"
                        :class="css.empty__description"
                      >
                        {{ empty.description }}
                      </p>
                    </slot>
                  </div>
                </slot>
              </td>
            </Transition>
          </tr>
          <slot
            v-if="slots['body.append'] && !(loading && noData)"
            name="body.append"
          />
        </tbody>
        <tfoot>
          <slot name="tfoot" />
        </tfoot>
      </table>
    </div>
    <TablePagination
      v-if="paginationData && !hideDefaultFooter"
      v-model="paginationData"
      :dense="dense"
      :loading="loading"
      data-cy="table-pagination"
    />
  </div>
</template>

<style lang="scss" module>
.wrapper {
  @apply relative divide-y divide-black/[0.12] overflow-hidden;
  &.outlined {
    @apply border border-black/[0.12];
  }

  &.rounded__sm {
    @apply rounded-[.25rem];

    .image {
      @apply rounded-t-[.25rem];
    }
  }

  &.rounded__md {
    @apply rounded-[.75rem];

    .image {
      @apply rounded-t-[.75rem];
    }
  }

  &.rounded__lg {
    @apply rounded-[1rem];

    .image {
      @apply rounded-t-[1rem];
    }
  }

  .scroller {
    @apply overflow-x-auto overflow-y-hidden;
  }

  .table {
    @apply min-w-full table-fixed divide-y divide-black/[0.12] whitespace-nowrap mx-auto my-0;
    max-width: fit-content;

    .thead {
      @apply divide-y divide-black/[0.12];
      .tr {
        .th {
          @apply p-4;

          &.align__start {
            @apply text-left rtl:text-right;
          }

          &.align__center {
            @apply text-center;
          }

          &.align__end {
            @apply text-right rtl:text-left;
          }

          &.sortable {
            &.align__start {
              @apply pl-3;
            }

            &.align__center {
              @apply pl-3;
              .sort__button {
                @apply ml-6;
              }
            }

            &.align__end {
              @apply pr-3;
            }

            .sort__button {
              @apply inline-flex;

              &:hover .sort__icon {
                @apply opacity-60;
              }

              &.sort {
                &__active {
                  .sort__icon {
                    @apply opacity-100;
                  }
                }

                &__desc {
                  .sort__icon {
                    @apply rotate-0;
                  }
                }

                &__asc {
                  .sort__icon {
                    @apply rotate-180;
                  }
                }
              }
            }

            .sort__icon {
              @apply transition opacity-0 rotate-180;
            }
          }

          .column__text {
            @apply text-rui-text font-medium text-sm leading-6;
          }
        }
      }

      &__loader {
        .progress {
          @apply relative w-full py-8;
        }

        &_linear {
          @apply border-none;

          .progress {
            @apply p-0 h-0;
          }

          .progress__wrapper {
            @apply h-0 -mt-1;
          }
        }
      }
    }

    .tbody {
      @apply divide-y divide-black/[0.12];

      &--striped {
        .tr {
          &:nth-child(even) {
            @apply bg-rui-grey-50;
          }
        }
      }

      .tr {
        @apply hover:bg-black/[0.04];

        &__selected {
          @apply bg-rui-primary/[0.08];
        }

        &__empty {
          @apply hover:bg-transparent;
        }
      }

      .td {
        @apply p-4 text-rui-text text-body-2;
        text-wrap: initial;

        &.align__start {
          @apply text-left rtl:text-right;
        }

        &.align__center {
          @apply text-center;
        }

        &.align__end {
          @apply text-right rtl:text-left;
        }

        .empty {
          @apply flex flex-col space-y-3 items-center justify-center flex-1 py-2;

          &__label {
            @apply text-body-1 font-bold text-center text-current;
          }

          &__description {
            @apply text-body-2 text-center text-rui-text-secondary;
          }
        }
      }
    }

    .checkbox {
      @apply ps-4 w-14;
    }

    &.dense {
      .thead {
        .tr {
          .th {
            @apply py-[0.38rem];
          }
        }
      }

      .tbody {
        .td {
          @apply py-[0.38rem];
        }
      }
    }
  }
}

:global(.dark) {
  .wrapper {
    @apply divide-white/[0.12];

    &.outlined {
      @apply border-white/[0.12];
    }

    .table {
      @apply divide-gray-700;
      .thead {
        @apply divide-y divide-gray-700;
        .tr {
          .th {
            @apply text-white;
          }
        }
      }

      .tbody {
        @apply divide-white/[0.12];

        &--striped {
          .tr {
            &:nth-child(even) {
              @apply bg-rui-grey-900;
            }
          }
        }

        .tr {
          &__selected {
            @apply bg-rui-dark-primary/[0.08];
          }
        }

        .td {
          @apply text-gray-400;
        }
      }
    }
  }
}
</style>
