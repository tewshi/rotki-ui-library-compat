import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import RevealableTextField from '@/components/forms/revealable-text-field/RevealableTextField.vue';

const createWrapper = (options?: any) =>
  mount(RevealableTextField, { ...options, stubs: { RuiIcon: true } });

describe('Forms/RevealableTextField', () => {
  it('renders properly', () => {
    const label = 'Password';
    const wrapper = createWrapper({
      propsData: {
        label,
      },
    });
    expect(wrapper.find('label').text()).toContain(label);
  });

  it('toggle the type', async () => {
    const wrapper = createWrapper();

    expect(wrapper.find('input').attributes().type).toBe('password');
    expect(wrapper.find('ruiicon-stub').attributes().name).toBe('eye-off-line');

    await wrapper.find('button').trigger('click');
    expect(wrapper.find('input').attributes().type).toBe('text');
    expect(wrapper.find('ruiicon-stub').attributes().name).toBe('eye-line');

    await wrapper.find('button').trigger('click');
    expect(wrapper.find('input').attributes().type).toBe('password');
    expect(wrapper.find('ruiicon-stub').attributes().name).toBe('eye-off-line');
  });
});
