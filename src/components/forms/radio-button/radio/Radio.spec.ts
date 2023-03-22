import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Radio from './Radio.vue';

const createWrapper = (options?: any) =>
  mount(Radio, {
    ...options,
    stubs: {
      RuiIcon: true,
    },
  });

describe('Forms/RadioButton/Radio', () => {
  it('renders properly', () => {
    const label = 'Radio Label';
    const wrapper = createWrapper({
      propsData: {
        internalValue: 'value',
      },
      slots: {
        default: label,
      },
    });
    expect(wrapper.text()).toContain(label);
    expect(wrapper.get('label > div').classes()).toMatch(/_radio_/);
  });

  it('passes disabled props', async () => {
    const wrapper = createWrapper({
      propsData: {
        internalValue: 'value',
      },
    });
    expect(wrapper.find('input').attributes('disabled')).toBeUndefined();
    expect(wrapper.get('label').classes()).not.toMatch(/_disabled_/);
    await wrapper.setProps({ disabled: true });
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
    expect(wrapper.get('label').classes()).toMatch(/_disabled_/);
    await wrapper.setProps({ disabled: false });
    expect(wrapper.find('input').attributes('disabled')).toBeUndefined();
    expect(wrapper.get('label').classes()).not.toMatch(/_disabled_/);
  });

  it('render icon correctly', async () => {
    const wrapper = createWrapper({
      propsData: {
        internalValue: 'value',
      },
    });

    expect(wrapper.find('ruiicon-stub').attributes('name')).toBe(
      'checkbox-blank-circle-line',
    );

    await wrapper.setProps({ value: 'value' });
    expect(wrapper.find('ruiicon-stub').attributes('name')).toBe(
      'radio-button-line',
    );
  });

  it('passes color props', async () => {
    const wrapper = createWrapper({
      propsData: { internalValue: 'value', color: 'primary' },
    });
    expect(wrapper.find('label > div').classes()).toMatch(/_primary_/);

    await wrapper.setProps({ color: 'secondary' });
    expect(wrapper.find('label > div').classes()).toMatch(/_secondary_/);

    await wrapper.setProps({ color: 'error' });
    expect(wrapper.find('label > div').classes()).toMatch(/_error_/);

    await wrapper.setProps({ color: 'success' });
    expect(wrapper.find('label > div').classes()).toMatch(/_success_/);
  });

  it('passes size props', async () => {
    const wrapper = createWrapper({
      propsData: { internalValue: 'value', size: 'sm' },
    });
    expect(wrapper.find('label > div').classes()).toMatch(/_sm_/);

    await wrapper.setProps({ sm: false, size: 'lg' });
    expect(wrapper.find('label > div').classes()).toMatch(/_lg_/);
  });

  it('passes hint props', async () => {
    const wrapper = createWrapper({
      propsData: {
        internalValue: 'value',
      },
    });
    expect(wrapper.find('.details > div').text()).toBe('');

    const hint = 'Radio Hints';
    await wrapper.setProps({ hint });
    expect(wrapper.find('.details > div').classes()).toMatch(
      /text-rui-text-secondary/,
    );
    expect(wrapper.find('.details > div').text()).toBe(hint);
  });

  it('passes hint errorMessages', async () => {
    const wrapper = createWrapper({
      propsData: {
        internalValue: 'value',
      },
    });
    expect(wrapper.find('.details > div').text()).toBe('');

    const errorMessage = 'Radio Error Message';
    await wrapper.setProps({ errorMessages: [errorMessage] });
    expect(wrapper.find('.details > div').classes()).toMatch(/text-rui-error/);
    expect(wrapper.find('.details > div').text()).toBe(errorMessage);
  });

  it('passes hideDetails', async () => {
    const wrapper = createWrapper({
      propsData: {
        internalValue: 'value',
        hint: 'This hint should not be rendered',
        hideDetails: true,
      },
    });
    expect(wrapper.find('.details > div').exists()).toBeFalsy();
  });
});
