import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SimpleSelect from '@/components/forms/select/SimpleSelect.vue';

const createWrapper = (options?: any) => mount(SimpleSelect, options);

describe('simple select', () => {
  it('renders properly', async () => {
    const wrapper = createWrapper({
      propsData: {
        options: [
          'Option 0',
          'Option 1',
          'Option 2',
          'Option 3',
          'Option 4',
          'Option 5',
        ],
        value: 'Option 5',
      },
    });

    expect(wrapper.get('select').classes()).toMatch(/_select_/);
    expect(wrapper.find('span > svg').exists()).toBeTruthy();
  });

  it('passes props correctly', async () => {
    const wrapper = createWrapper({
      propsData: {
        disabled: true,
        options: [
          'Option 0',
          'Option 1',
          'Option 2',
          'Option 3',
          'Option 4',
          'Option 5',
        ],
        value: 'Option 5',
      },
    });
    expect(wrapper.find('select[disabled]').exists()).toBeTruthy();
  });
});
