import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Chip from '@/components/chips/Chip.vue';

const createWrapper = (options?: any) =>
  mount(Chip, { ...options, stubs: { RuiIcon: true } });

describe('Chips/Chip', () => {
  it('renders properly', () => {
    const label = 'Chip';
    const wrapper = createWrapper({
      propsData: {
        label,
      },
    });
    expect(wrapper.find('span[class*=_label]').text()).toContain(label);
  });

  it('shows dismiss icon', async () => {
    const wrapper = createWrapper({
      propsData: {
        label: 'Chip',
        dismissible: true,
      },
    });

    expect(wrapper.find('button').attributes().disabled).toBeUndefined();

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('remove');
  });

  it("disabled chip can't dismiss dismiss", async () => {
    const wrapper = createWrapper({
      propsData: {
        label: 'Chip',
        dismissible: true,
        disabled: true,
      },
    });

    expect(wrapper.find('button').attributes().disabled).toBe('disabled');

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).not.toHaveProperty('remove');
  });
});
