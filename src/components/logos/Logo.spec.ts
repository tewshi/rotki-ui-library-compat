import { promiseTimeout } from '@vueuse/shared';
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Logo from '@/components/logos/Logo.vue';

function createWrapper(options?: any) {
  return mount(Logo, { ...options });
}

describe('forms/Logo', () => {
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

  it('passes logo props', async () => {
    const wrapper = createWrapper();
    expect(wrapper.find('div').text()).toBe('');
    expect(wrapper.find('img[data-image=custom]').exists()).toBeFalsy();
    await wrapper.setProps({ logo: 'website' });
    expect(wrapper.find('img[data-image=custom]').exists()).toBeFalsy();
    await promiseTimeout(1000);
    expect(wrapper.find('img[data-image=custom]').exists()).toBeTruthy();
    await wrapper.setProps({ uniqueKey: '10' });
    expect(wrapper.find('img[data-image=custom][src*="?key=10"]').exists()).toBeTruthy();
  });
});
