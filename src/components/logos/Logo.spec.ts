import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Logo from './Logo.vue';

const createWrapper = (options?: any) =>
  mount(Logo, { ...options, stubs: { RuiIcon: true } });

describe('Forms/Logo', () => {
  it('renders properly', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('div').find('img').exists()).toBeTruthy();
  });

  it('passes text props', async () => {
    const wrapper = createWrapper();
    expect(wrapper.find('div').text()).toBe('');
    await wrapper.setProps({ text: true });
    expect(wrapper.find('div').text()).toBe('rotki');
    await wrapper.setProps({ text: false });
    expect(wrapper.find('div').text()).toBe('');
  });
});
