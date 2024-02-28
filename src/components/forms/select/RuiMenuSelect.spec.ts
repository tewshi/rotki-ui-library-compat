import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import RuiMenuSelect from '@/components/forms/select/RuiMenuSelect.vue';

interface SelectOption { id: string; label: string }

function createWrapper(options?: any) {
  return mount(RuiMenuSelect, options);
}

describe('menu select', () => {
  const options: SelectOption[] = [
    { id: '1', label: 'Germany' },
    { id: '2', label: 'Nigeria' },
    { id: '3', label: 'Greece' },
    { id: '4', label: 'Indonesia' },
    { id: '5', label: 'Spain' },
    { id: '6', label: 'India' },
    { id: '7', label: 'France' },
    { id: '8', label: 'England' },
    ...[...new Array(50).keys()].map(index => ({
      id: `${index + 9}`,
      label: `${index + 9}`,
    })),
  ];

  it('renders properly', () => {
    const wrapper = createWrapper({
      propsData: {
        keyAttr: 'id',
        options,
        textAttr: 'label',
        value: null,
      },
    });

    expect(wrapper.get('label').classes()).toMatch(/_activator_/);
    expect(wrapper.find('label span[class*=label]').exists()).toBeTruthy();
    expect(wrapper.find('span > svg').exists()).toBeTruthy();
  });

  it('passes props correctly', () => {
    const wrapper = createWrapper({
      propsData: {
        disabled: true,
        keyAttr: 'id',
        options,
        textAttr: 'label',
        value: options[4],
      },
    });
    expect(wrapper.find('label[aria-disabled]').exists()).toBeTruthy();
    expect(wrapper.find('label[aria-disabled]').text()).toMatch('Spain');
  });
});
