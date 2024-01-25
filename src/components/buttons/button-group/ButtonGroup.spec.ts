import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import Button from '@/components/buttons/button/Button.vue';
import ButtonGroup from './ButtonGroup.vue';

function createWrapper(options?: any) {
  return mount(ButtonGroup, {
    ...options,
    slots: {
      default: [Button, Button, Button],
    },
  });
}

describe('button/ButtonGroup', () => {
  it('passes vertical props', async () => {
    const wrapper = createWrapper();
    expect(wrapper.classes()).not.toMatch(/vertical/);
    await wrapper.setProps({ vertical: true });
    expect(wrapper.classes()).toMatch(/vertical/);
  });

  it('passes color props', async () => {
    const wrapper = createWrapper({
      propsData: {
        color: 'primary',
      },
    });
    expect(wrapper.classes()).toMatch(/_primary_/);
    expect(wrapper.find('button').classes()).toMatch(/_primary_/);

    await wrapper.setProps({ color: 'secondary' });
    expect(wrapper.classes()).toMatch(/_secondary_/);
    expect(wrapper.find('button').classes()).toMatch(/_secondary_/);

    await wrapper.setProps({ color: 'error' });
    expect(wrapper.classes()).toMatch(/_error_/);
    expect(wrapper.find('button').classes()).toMatch(/_error_/);

    await wrapper.setProps({ color: 'success' });
    expect(wrapper.classes()).toMatch(/_success_/);
    expect(wrapper.find('button').classes()).toMatch(/_success_/);
  });

  it('passes variant props', async () => {
    const wrapper = createWrapper();
    expect(wrapper.classes()).not.toMatch(/_outlined_/);
    await wrapper.setProps({ variant: 'outlined' });
    expect(wrapper.classes()).toMatch(/_outlined_/);
    expect(wrapper.find('button').classes()).toMatch(/_outlined_/);
    await wrapper.setProps({ variant: 'text' });
    expect(wrapper.classes()).toMatch(/_text_/);
    expect(wrapper.find('button').classes()).toMatch(/_text_/);
  });

  it('passes size props', async () => {
    const wrapper = createWrapper();

    expect(wrapper.find('button').classes()).not.toMatch(/_sm_/);
    expect(wrapper.find('button').classes()).not.toMatch(/_lg_/);
    await wrapper.setProps({ size: 'sm' });
    expect(wrapper.find('button').classes()).toMatch(/_sm_/);
    await wrapper.setProps({ size: 'lg' });
    expect(wrapper.find('button').classes()).toMatch(/_lg_/);
  });

  it('toggleable button group', async () => {
    const value = ref(0);
    const updateModelValue = vi.fn((v?: number) => set(value, v));
    const wrapper = createWrapper({
      inheritAttrs: true,
      propsData: {
        value,
      },
    });

    wrapper.vm.$on('input', (e: number) => {
      updateModelValue(e);
    });

    const buttons = wrapper.findAll('button');

    // only first button active
    expect(buttons.at(0).classes()).toMatch(/_active_/);
    expect(buttons.at(1).classes()).not.toMatch(/_active_/);
    expect(buttons.at(2).classes()).not.toMatch(/_active_/);

    // on click, second button should take active state
    await buttons.at(1).trigger('click');
    expect(get(value)).toEqual(1);
    expect(wrapper.emitted('input')).toHaveLength(1);
    expect(updateModelValue).toHaveBeenCalledOnce();

    expect(buttons.at(0).classes()).not.toMatch(/_active_/);
    expect(buttons.at(1).classes()).toMatch(/_active_/);
    expect(buttons.at(2).classes()).not.toMatch(/_active_/);

    // on click, third button should take active state
    await buttons.at(2).trigger('click');
    expect(get(value)).toEqual(2);
    expect(wrapper.emitted('input')).toHaveLength(2);
    expect(updateModelValue).toHaveBeenCalledTimes(2);

    expect(buttons.at(0).classes()).not.toMatch(/_active_/);
    expect(buttons.at(1).classes()).not.toMatch(/_active_/);
    expect(buttons.at(2).classes()).toMatch(/_active_/);

    // on click, active button should lose state
    await buttons.at(2).trigger('click');
    expect(buttons.at(0).classes()).not.toMatch(/_active_/);
    expect(buttons.at(1).classes()).not.toMatch(/_active_/);
    expect(buttons.at(2).classes()).not.toMatch(/_active_/);
    expect(get(value)).toBeUndefined();

    // set as required
    await wrapper.setProps({ required: true });
    await buttons.at(2).trigger('click');
    expect(buttons.at(0).classes()).not.toMatch(/_active_/);
    expect(buttons.at(1).classes()).not.toMatch(/_active_/);
    expect(buttons.at(2).classes()).toMatch(/_active_/);
    expect(get(value)).toEqual(2);

    // required so, can't deselect the active item
    await buttons.at(2).trigger('click');
    expect(get(value)).toEqual(2);
    expect(buttons.at(2).classes()).toMatch(/_active_/);
  });

  it('multiple toggleable button group', async () => {
    const value = ref([0]);
    const updateModelValue = vi.fn((v?: number[]) => set(value, v));
    const wrapper = createWrapper({
      inheritAttrs: true,
      propsData: {
        value,
      },
    });

    wrapper.vm.$on('input', (e: number[]) => {
      updateModelValue(e);
    });

    const buttons = wrapper.findAll('button');

    expect(buttons.at(0).classes()).toMatch(/_active_/);
    expect(buttons.at(1).classes()).not.toMatch(/_active_/);
    expect(buttons.at(2).classes()).not.toMatch(/_active_/);

    // on click, second button should also be active
    await buttons.at(1).trigger('click');
    expect(get(value)).toEqual([0, 1]);
    expect(wrapper.emitted('input')).toHaveLength(1);
    expect(updateModelValue).toHaveBeenCalledOnce();

    expect(buttons.at(0).classes()).toMatch(/_active_/);
    expect(buttons.at(1).classes()).toMatch(/_active_/);
    expect(buttons.at(2).classes()).not.toMatch(/_active_/);

    // on click, third button should also be active
    await buttons.at(2).trigger('click');
    expect(get(value)).toEqual([0, 1, 2]);
    expect(wrapper.emitted('input')).toHaveLength(2);
    expect(updateModelValue).toHaveBeenCalledTimes(2);

    expect(buttons.at(0).classes()).toMatch(/_active_/);
    expect(buttons.at(1).classes()).toMatch(/_active_/);
    expect(buttons.at(2).classes()).toMatch(/_active_/);

    await buttons.at(0).trigger('click');
    await buttons.at(1).trigger('click');
    await buttons.at(2).trigger('click');

    expect(buttons.at(0).classes()).not.toMatch(/_active_/);
    expect(buttons.at(1).classes()).not.toMatch(/_active_/);
    expect(buttons.at(2).classes()).not.toMatch(/_active_/);
    expect(get(value)).toEqual([]);

    // set required
    await wrapper.setProps({ required: true });
    await buttons.at(2).trigger('click');
    expect(buttons.at(0).classes()).not.toMatch(/_active_/);
    expect(buttons.at(1).classes()).not.toMatch(/_active_/);
    expect(buttons.at(2).classes()).toMatch(/_active_/);
    expect(get(value)).toEqual([2]);

    // required so, can't deselect the active only item
    await buttons.at(2).trigger('click');
    expect(buttons.at(2).classes()).toMatch(/_active_/);
    expect(get(value)).toEqual([2]);

    await wrapper.setProps({ gap: 'md' });
    expect(wrapper.classes()).toMatch(/_separated_/);
    expect(wrapper.classes()).toMatch(/_separated__md/);

    await wrapper.setProps({ gap: 'sm' });
    expect(wrapper.classes()).toMatch(/_separated_/);
    expect(wrapper.classes()).toMatch(/_separated__sm/);

    await wrapper.setProps({ gap: 'lg' });
    expect(wrapper.classes()).toMatch(/_separated_/);
    expect(wrapper.classes()).toMatch(/_separated__lg/);
  });

  it('disabled button group', async () => {
    const value = ref([0]);
    const updateModelValue = vi.fn((v?: number[]) => set(value, v));
    const wrapper = createWrapper({
      inheritAttrs: true,
      propsData: {
        value,
      },
    });

    wrapper.vm.$on('input', (e: number[]) => {
      updateModelValue(e);
    });

    const buttons = wrapper.findAll('button');

    expect(buttons.at(0).attributes('disabled')).toBeUndefined();
    expect(buttons.at(1).attributes('disabled')).toBeUndefined();
    expect(buttons.at(2).attributes('disabled')).toBeUndefined();

    await wrapper.setProps({ disabled: true });

    expect(buttons.at(0).attributes('disabled')).toBeDefined();
    expect(buttons.at(1).attributes('disabled')).toBeDefined();
    expect(buttons.at(2).attributes('disabled')).toBeDefined();
  });
});
