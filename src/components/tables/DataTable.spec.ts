/* eslint-disable max-lines */
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import DataTable from '@/components/tables/DataTable.vue';
import { type TableColumn } from '@/components/tables/TableHead.vue';
import TablePagination from '@/components/tables/TablePagination.vue';
import { RuiSimpleSelect } from '~/src';

const createWrapper = (options?: any) =>
  mount(DataTable, {
    ...options,
    provide: {
      [TableSymbol.valueOf()]: {
        itemsPerPage: ref(10),
        globalItemsPerPage: get(false),
        limits: [5, 10, 15, 25, 50, 100, 200],
      },
    },
  });

describe('DataTable', () => {
  const data = [
    ...[...new Array(50)].map((_, index) => ({
      id: index + 1,
      name: `Lindsay Walton ${index}`,
      title: index % 2 === 0 ? 'Back-end Developer' : 'Front-end Developer',
      email: `lindsay.walton${index}@example.com`,
    })),
  ];

  const columns: TableColumn[] = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'name',
      label: 'Full name',
      sortable: true,
      align: 'end',
    },
    {
      key: 'title',
      label: 'Job position',
      sortable: true,
      align: 'start',
    },
    {
      key: 'email',
      label: 'Email address',
      sortable: true,
      align: 'center',
    },
    {
      key: 'action',
    },
  ];

  it('renders properly', async () => {
    const wrapper = createWrapper({
      propsData: {
        rows: data,
        rowAttr: 'id',
        cols: columns,
      },
    });

    expect(wrapper.get('table').classes()).toMatch(/_table_/);
    expect(wrapper.find('table thead').exists()).toBeTruthy();
    expect(wrapper.find('table tbody').exists()).toBeTruthy();
  });

  it('passes props correctly', async () => {
    const wrapper = createWrapper({
      propsData: {
        rows: data,
        rowAttr: 'id',
        cols: columns,
        value: [],
        dense: true,
        outlined: true,
        search: '',
        sort: [{ column: 'name', direction: 'asc' }],
        pagination: { limit: 10, page: 1, total: 50 },
        expanded: [],
      },
      slots: {
        'expanded-item': {
          template: '<div data-cy="expanded-content">Expanded content</div>',
        },
      },
    });

    wrapper.vm.$on('update:expanded', (e: typeof data) =>
      wrapper.setProps({ expanded: e }),
    );

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
        .find('tbody tr[hidden]:nth-child(2) div[data-cy=expanded-content]')
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
        .find('tbody tr[hidden]:nth-child(2) div[data-cy=expanded-content]')
        .exists(),
    ).toBeFalsy();
  });

  it('multiple expand toggles correctly', async () => {
    const wrapper = createWrapper({
      propsData: {
        rows: data,
        rowAttr: 'id',
        cols: columns,
        modelValue: [],
        expanded: [],
      },
      slots: {
        'expanded-item': {
          template: '<div data-cy="expanded-content">Expanded content</div>',
        },
      },
    });

    wrapper.vm.$on('update:expanded', (e: typeof data) =>
      wrapper.setProps({ expanded: e }),
    );

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

  it('single expand toggles correctly', async () => {
    const wrapper = createWrapper({
      propsData: {
        rows: data,
        rowAttr: 'id',
        cols: columns,
        value: [],
        singleExpand: true,
        expanded: [],
      },
      slots: {
        'expanded-item': {
          template: '<div data-cy="expanded-content">Expanded content</div>',
        },
      },
    });

    wrapper.vm.$on('update:expanded', (e: typeof data) =>
      wrapper.setProps({ expanded: e }),
    );

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
      .find('tbody tr:nth-child(1) button[class*=_tr__expander_button]')
      .trigger('click');

    expect(wrapper.props().expanded).toHaveLength(0);

    expect(
      wrapper
        .find('tbody tr[hidden]:nth-child(2) div[data-cy=expanded-content]')
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
        rows: data,
        rowAttr: 'id',
        cols: columns,
        value: [],
        stickyHeader: true,
        stickyOffset: 40,
      },
    });

    expect(wrapper.find('thead[data-id=head-clone]').exists()).toBeTruthy();

    await wrapper.setProps({ stickyHeader: false });

    expect(wrapper.find('thead[data-id=head-clone]').exists()).toBeFalsy();
  });

  describe('global settings', () => {
    it('should follow global settings', async () => {
      const itemsPerPage = ref(25);
      const wrapperComponent = {
        template:
          "<div><DataTable :rows='[]' row-attr='id'/><DataTable :rows='[]' row-attr='id'/></div>",
      };

      const wrapper = mount(wrapperComponent, {
        components: {
          DataTable,
        },
        provide: {
          [TableSymbol.valueOf()]: createTableDefaults({
            itemsPerPage,
            globalItemsPerPage: true,
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
          "<div><DataTable :rows='[]' row-attr='id'/><DataTable :globalItemsPerPage='false' :rows='[]' row-attr='id'/></div>",
      };

      const wrapper = mount(wrapperComponent, {
        components: {
          DataTable,
        },
        provide: {
          [TableSymbol.valueOf()]: createTableDefaults({
            itemsPerPage,
            globalItemsPerPage: true,
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
          "<div><DataTable :rows='[]' row-attr='id'/><DataTable :globalItemsPerPage='true' :rows='[]' row-attr='id'/></div>",
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
});
