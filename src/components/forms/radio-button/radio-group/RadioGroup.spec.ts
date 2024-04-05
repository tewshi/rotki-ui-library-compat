import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import RadioGroup from './RadioGroup.vue';

function createWrapper(options?: any) {
  return mount(RadioGroup, { ...options, stubs: { RuiIcon: true } });
}

describe('forms/RadioButton/RadioGroup', () => {
  it('passes inline props', async () => {
    const wrapper = createWrapper();
    expect(wrapper.find('div[class*=wrapper]').classes()).not.toEqual(
      expect.arrayContaining([expect.stringMatching(/inline/)]),
    );
    await wrapper.setProps({ inline: true });
    expect(wrapper.find('div[class*=wrapper]').classes()).toEqual(
      expect.arrayContaining([expect.stringMatching(/inline/)]),
    );
  });

  it('passes hint props', async () => {
    const wrapper = createWrapper();
    expect(wrapper.find('.details > div').exists()).toBeFalsy();

    const hint = 'RadioGroup Hints';
    await wrapper.setProps({ hint });
    expect(wrapper.find('.details > div').classes()).toEqual(
      expect.arrayContaining([expect.stringMatching(/text-rui-text-secondary/)]),
    );
    expect(wrapper.find('.details > div').text()).toBe(hint);
  });

  it('passes hint errorMessages', async () => {
    const wrapper = createWrapper();
    expect(wrapper.find('.details > div').exists()).toBeFalsy();

    const errorMessage = 'RadioGroup Error Message';
    await wrapper.setProps({ errorMessages: [errorMessage] });
    expect(wrapper.find('.details > div').classes()).toEqual(
      expect.arrayContaining([expect.stringMatching(/text-rui-error/)]),
    );
    expect(wrapper.find('.details > div').text()).toBe(errorMessage);
  });

  it('passes hideDetails', async () => {
    const wrapper = createWrapper({
      propsData: {
        hideDetails: true,
        hint: 'This hint should not be rendered',
      },
    });
    expect(wrapper.find('.details > div').exists()).toBeFalsy();
  });
});
