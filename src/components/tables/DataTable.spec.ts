import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import DataTable from '@/components/tables/DataTable.vue';
import TablePagination from '@/components/tables/TablePagination.vue';
import { RuiSimpleSelect } from '~/src';
import type { TableColumn } from '@/components/tables/TableHead.vue';

function createWrapper(options?: any) {
  return mount(DataTable, {
    ...options,
    provide: {
      [TableSymbol.valueOf()]: {
        globalItemsPerPage: get(false),
        itemsPerPage: ref(10),
        limits: [5, 10, 15, 25, 50, 100, 200],
      },
    },
  });
}

describe('dataTable', () => {
  const data = [
    ...[...new Array(50)].map((_, index) => ({
      email: `lindsay.walton${index}@example.com`,
      id: index + 1,
      name: `Lindsay Walton ${index}`,
      title: index % 2 === 0 ? 'Back-end Developer' : 'Front-end Developer',
    })),
  ];

  const columns: TableColumn[] = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      align: 'end',
      key: 'name',
      label: 'Full name',
      sortable: true,
    },
    {
      align: 'start',
      key: 'title',
      label: 'Job position',
      sortable: true,
    },
    {
      align: 'center',
      key: 'email',
      label: 'Email address',
      sortable: true,
    },
    {
      key: 'action',
    },
  ];

  it('renders properly', async () => {
    const wrapper = createWrapper({
      propsData: {
        cols: columns,
        rowAttr: 'id',
        rows: data,
      },
    });

    expect(wrapper.get('table').classes()).toMatch(/_table_/);
    expect(wrapper.find('table thead').exists()).toBeTruthy();
    expect(wrapper.find('table tbody').exists()).toBeTruthy();
  });

  it('passes props correctly', async () => {
    const wrapper = createWrapper({
      propsData: {
        cols: columns,
        dense: true,
        expanded: [],
        outlined: true,
        pagination: { limit: 10, page: 1, total: 50 },
        rowAttr: 'id',
        rows: data,
        search: '',
        sort: [{ column: 'name', direction: 'asc' }],
        value: [],
      },
      slots: {
        'expanded-item': {
          template: '<div data-cy="expanded-content">Expanded content</div>',
        },
      },
    });

    wrapper.vm.$on('update:expanded', (e: typeof data) =>
      wrapper.setProps({ expanded: e }));

    expect(
      wrapper.find('table thead th[class*=_checkbox_]').exists(),
    ).toBeTruthy();
    expect(
      wrapper.find('table tbody td[class*=_checkbox_]').exists(),
    ).toBeTruthy();
    expect(
      wrapper.find('table tbody td[class*=_align__start_]').exists(),
    ).toBeTruthy();
    expect(
      wrapper.find('table tbody td[class*=_align__end_]').exists(),
    ).toBeTruthy();
    expect(
      wrapper.find('table tbody td[class*=_align__center_]').exists(),
    ).toBeTruthy();
    expect(wrapper.find('div div[class*=_limit_]').exists()).toBeTruthy();
    expect(wrapper.find('div div[class*=_limit_]').exists()).toBeTruthy();
    expect(wrapper.find('div div[class*=_navigation_]').exists()).toBeTruthy();
    expect(
      wrapper.find('div div[class*=_navigation_] button[disabled]').exists(),
    ).toBeTruthy();

    expect(
      wrapper
        .find('tbody tr:nth-child(1) button[class*=_tr__expander_button]')
        .exists(),
    ).toBeTruthy();

    expect(
      wrapper
        .find('tbody tr:nth-child(2) div[data-cy=expanded-content]')
        .exists(),
    ).toBeFalsy();

    await wrapper
      .find('tbody tr:nth-child(1) button[class*=_tr__expander_button]')
      .trigger('click');

    expect(
      wrapper
        .find('tbody tr:nth-child(1) button[class*=_tr__expander_button_open]')
        .exists(),
    ).toBeTruthy();

    expect(
      wrapper
        .find('tbody tr:nth-child(2) div[data-cy=expanded-content]')
        .exists(),
    ).toBeTruthy();
  });

  it('multiple expand toggles correctly', async () => {
    const wrapper = createWrapper({
      propsData: {
        cols: columns,
        expanded: [],
        modelValue: [],
        rowAttr: 'id',
        rows: data,
      },
      slots: {
        'expanded-item': {
          template: '<div data-cy="expanded-content">Expanded content</div>',
        },
      },
    });

    wrapper.vm.$on('update:expanded', (e: typeof data) =>
      wrapper.setProps({ expanded: e }));

    expect(wrapper.props().expanded).toHaveLength(0);

    expect(
      wrapper
        .find('tbody tr[hidden]:nth-child(2) div[data-cy=expanded-content]')
        .exists(),
    ).toBeFalsy();

    await wrapper
      .find('tbody tr:nth-child(1) button[class*=_tr__expander_button]')
      .trigger('click');

    expect(wrapper.props().expanded).toHaveLength(1);

    expect(
      wrapper
        .find('tbody tr:nth-child(1) button[class*=_tr__expander_button_open]')
        .exists(),
    ).toBeTruthy();

    expect(
      wrapper
        .find('tbody tr:nth-child(2) div[data-cy=expanded-content]')
        .exists(),
    ).toBeTruthy();

    await wrapper
      .find('tbody tr:nth-child(3) button[class*=_tr__expander_button]')
      .trigger('click');

    expect(wrapper.props().expanded).toHaveLength(2);

    expect(
      wrapper
        .find('tbody tr:nth-child(1) button[class*=_tr__expander_button_open]')
        .exists(),
    ).toBeTruthy();

    expect(
      wrapper
        .find('tbody tr:nth-child(4) div[data-cy=expanded-content]')
        .exists(),
    ).toBeTruthy();
  });

  it('selection toggles correctly', async () => {
    const wrapper = createWrapper({
      propsData: {
        cols: columns,
        rowAttr: 'id',
        rows: data,
        value: [],
      },
    });

    wrapper.vm.$on('input', (e: string[]) => wrapper.setProps({ value: e }));

    expect(wrapper.props().value).toHaveLength(0);

    expect(
      wrapper
        .find('thead tr [data-cy=table-toggle-check-all] input')
        .exists(),
    ).toBeTruthy();

    const checkAll = wrapper.find('thead tr th').findComponent(RuiCheckbox);

    expect(checkAll.exists()).toBeTruthy();

    checkAll.vm.$emit('input', true);

    await nextTick();

    expect(wrapper.props().value).toHaveLength(10);

    expect(
      wrapper
        .find('tr [data-cy*=table-toggle-check-] span[class*=checkbox][class*=checked]')
        .exists(),
    ).toBeTruthy();

    expect(
      wrapper
        .findAll('tr [data-cy*=table-toggle-check-] span[class*=checkbox][class*=checked]'),
    ).toHaveLength(11);

    checkAll.vm.$emit('input', false);

    await nextTick();

    expect(wrapper.props().value).toHaveLength(0);

    const checkFirst = wrapper.find('tbody tr:first-child').findComponent(RuiCheckbox);

    checkFirst.vm.$emit('input', true);

    await nextTick();

    expect(wrapper.props().value).toHaveLength(1);
  });

  it('single expand toggles correctly', async () => {
    const wrapper = createWrapper({
      propsData: {
        cols: columns,
        expanded: [],
        rowAttr: 'id',
        rows: data,
        singleExpand: true,
        value: [],
      },
      slots: {
        'expanded-item': {
          template: '<div data-cy="expanded-content">Expanded content</div>',
        },
      },
    });

    wrapper.vm.$on('update:expanded', (e: typeof data) =>
      wrapper.setProps({ expanded: e }));

    expect(wrapper.props().expanded).toHaveLength(0);

    expect(
      wrapper
        .find('tbody tr:nth-child(2) div[data-cy=expanded-content]')
        .exists(),
    ).toBeFalsy();

    await wrapper
      .find('tbody tr:nth-child(1) button[class*=_tr__expander_button]')
      .trigger('click');

    expect(wrapper.props().expanded).toHaveLength(1);

    expect(
      wrapper
        .find('tbody tr:nth-child(1) button[class*=_tr__expander_button_open]')
        .exists(),
    ).toBeTruthy();

    expect(
      wrapper
        .find('tbody tr:nth-child(2) div[data-cy=expanded-content]')
        .exists(),
    ).toBeTruthy();

    await wrapper
      .find('tbody tr:nth-child(1) button[class*=_tr__expander_button]')
      .trigger('click');

    expect(wrapper.props().expanded).toHaveLength(0);

    expect(
      wrapper
        .find('tbody tr:nth-child(2) div[data-cy=expanded-content]')
        .exists(),
    ).toBeFalsy();

    await wrapper
      .find('tbody tr:nth-child(1) button[class*=_tr__expander_button]')
      .trigger('click');

    expect(
      wrapper
        .find('tbody tr:nth-child(2) div[data-cy=expanded-content]')
        .exists(),
    ).toBeTruthy();

    await wrapper
      .find('tbody tr:nth-child(3) button[class*=_tr__expander_button]')
      .trigger('click');

    expect(wrapper.props().expanded).toHaveLength(1);

    expect(
      wrapper
        .find('tbody tr:nth-child(1) button[class*=_tr__expander_button_open]')
        .exists(),
    ).toBeFalsy();

    expect(
      wrapper
        .find('tbody tr:nth-child(4) div[data-cy=expanded-content]')
        .exists(),
    ).toBeFalsy();
  });

  it('sticky header behaves as expected', async () => {
    const wrapper = createWrapper({
      propsData: {
        cols: columns,
        rowAttr: 'id',
        rows: data,
        stickyHeader: true,
        stickyOffset: 40,
        value: [],
      },
    });

    expect(wrapper.find('thead[data-id=head-clone]').exists()).toBeTruthy();

    await wrapper.setProps({ stickyHeader: false });

    expect(wrapper.find('thead[data-id=head-clone]').exists()).toBeFalsy();
  });

  it('reset page number when search value is updated', async () => {
    const wrapper = createWrapper({
      propsData: {
        cols: columns,
        pagination: { limit: 10, page: 5, total: 50 },
        rowAttr: 'id',
        rows: data,
        search: '',
      },
    });

    await wrapper.setProps({ search: 'new search' });
    expect(wrapper.emitted('update:pagination')![0][0].page).toBe(1);
  });

  describe('global settings', () => {
    it('should follow global settings', async () => {
      const itemsPerPage = ref(25);
      const wrapperComponent = {
        template:
          '<div><DataTable :rows=\'[]\' row-attr=\'id\'/><DataTable :rows=\'[]\' row-attr=\'id\'/></div>',
      };

      const wrapper = mount(wrapperComponent, {
        components: {
          DataTable,
        },
        provide: {
          [TableSymbol.valueOf()]: createTableDefaults({
            globalItemsPerPage: true,
            itemsPerPage,
            limits: [5, 10, 15, 25, 50, 100, 200],
          }),
        },
      });

      await nextTick();

      const paginate = wrapper.findAllComponents(TablePagination);
      expect(paginate).toHaveLength(2);

      const first = paginate.at(0).vm as unknown as typeof TablePagination;
      const second = paginate.at(1).vm as unknown as typeof TablePagination;

      expect(first.value).toMatchObject(expect.objectContaining({ limit: 25 }));
      expect(second.value).toMatchObject(
        expect.objectContaining({ limit: 25 }),
      );

      const select = paginate.at(0).findComponent(RuiSimpleSelect);
      select.vm.$emit('input', 10);

      await nextTick();

      expect(first.value).toMatchObject(expect.objectContaining({ limit: 10 }));

      expect(second.value).toMatchObject(
        expect.objectContaining({ limit: 10 }),
      );

      expect(get(itemsPerPage)).toBe(10);
    });

    it('should respect local setting override', async () => {
      const itemsPerPage = ref(25);
      const wrapperComponent = {
        template:
          '<div><DataTable :rows=\'[]\' row-attr=\'id\'/><DataTable :globalItemsPerPage=\'false\' :rows=\'[]\' row-attr=\'id\'/></div>',
      };

      const wrapper = mount(wrapperComponent, {
        components: {
          DataTable,
        },
        provide: {
          [TableSymbol.valueOf()]: createTableDefaults({
            globalItemsPerPage: true,
            itemsPerPage,
            limits: [5, 10, 15, 25, 50, 100, 200],
          }),
        },
      });

      await nextTick();

      const paginate = wrapper.findAllComponents(TablePagination);
      expect(paginate).toHaveLength(2);

      const first = paginate.at(0).vm as unknown as typeof TablePagination;
      const second = paginate.at(1).vm as unknown as typeof TablePagination;

      expect(first.value).toMatchObject(expect.objectContaining({ limit: 25 }));
      expect(second.value).toMatchObject(
        expect.objectContaining({ limit: 10 }),
      );

      const globalSelect = paginate.at(0).findComponent(RuiSimpleSelect);
      const localSelect = paginate.at(1).findComponent(RuiSimpleSelect);
      globalSelect.vm.$emit('input', 10);
      localSelect.vm.$emit('input', 25);

      await nextTick();

      expect(first.value).toMatchObject(expect.objectContaining({ limit: 10 }));

      expect(second.value).toMatchObject(
        expect.objectContaining({ limit: 25 }),
      );

      expect(get(itemsPerPage)).toBe(10);
    });

    it('should follow single global setting', async () => {
      const itemsPerPage = ref(25);
      const wrapperComponent = {
        template:
          '<div><DataTable :rows=\'[]\' row-attr=\'id\'/><DataTable :globalItemsPerPage=\'true\' :rows=\'[]\' row-attr=\'id\'/></div>',
      };

      const wrapper = mount(wrapperComponent, {
        components: {
          DataTable,
        },
        provide: {
          [TableSymbol.valueOf()]: createTableDefaults({
            itemsPerPage,
            limits: [5, 10, 15, 25, 50, 100, 200],
          }),
        },
      });

      await nextTick();

      const paginate = wrapper.findAllComponents(TablePagination);
      expect(paginate).toHaveLength(2);

      const first = paginate.at(0).vm as unknown as typeof TablePagination;
      const second = paginate.at(1).vm as unknown as typeof TablePagination;

      expect(first.value).toMatchObject(expect.objectContaining({ limit: 10 }));

      expect(second.value).toMatchObject(
        expect.objectContaining({ limit: 25 }),
      );

      const globalSelect = paginate.at(0).findComponent(RuiSimpleSelect);
      const localSelect = paginate.at(1).findComponent(RuiSimpleSelect);
      globalSelect.vm.$emit('input', 25);
      localSelect.vm.$emit('input', 10);

      await nextTick();

      expect(first.value).toMatchObject(expect.objectContaining({ limit: 25 }));

      expect(second.value).toMatchObject(
        expect.objectContaining({ limit: 10 }),
      );

      expect(get(itemsPerPage)).toBe(10);
    });
  });

  it('pagination range works as expected', async () => {
    const wrapper = createWrapper({
      propsData: {
        'cols': columns,
        'onUpdate:pagination': (e: any) => wrapper.setProps({ pagination: e }),
        'rowAttr': 'id',
        'rows': data,
      },
    });

    await nextTick();

    await wrapper.setProps({ pagination: { limit: 10, page: 1, total: data.length } });

    const paginator = wrapper.findComponent(TablePagination);
    expect(paginator.exists()).toBeTruthy();

    expect(
      paginator
        .find('div[data-cy=table-pagination] div[class*=limit]')
        .exists(),
    ).toBeTruthy();

    expect(
      paginator
        .find('div[data-cy=table-pagination] div[class*=ranges]')
        .exists(),
    ).toBeTruthy();

    expect(
      paginator
        .find('div[data-cy=table-pagination] div[class*=navigation]')
        .exists(),
    ).toBeTruthy();

    const navButtons = paginator.findAllComponents(RuiButton);
    expect(navButtons.length).toBe(4);

    expect(navButtons.filter(b => b.attributes('disabled') === 'disabled')).toHaveLength(2);
    expect(navButtons.filter(b => b.attributes('disabled') === undefined)).toHaveLength(2);

    const simpleSelects = paginator.findAllComponents(RuiSimpleSelect);
    const limits = simpleSelects.at(0);
    const ranges = simpleSelects.at(1);
    expect(limits.exists()).toBeTruthy();
    expect(ranges.exists()).toBeTruthy();

    limits.vm.$emit('input', 5);

    await nextTick();

    expect(limits.props().value).toBe(5);

    ranges.vm.$emit('input', '6-10');

    await nextTick();

    expect(ranges.props().value).toBe('6-10');

    expect(navButtons.filter(b => b.attributes('disabled') === 'disabled')).toHaveLength(0);
    expect(navButtons.filter(b => b.attributes('disabled') === undefined)).toHaveLength(4);
  });
});
