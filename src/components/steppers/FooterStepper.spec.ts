import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import FooterStepper from '@/components/steppers/FooterStepper.vue';

const createWrapper = (options: any) => mount(FooterStepper, options);

describe('FooterStepper', () => {
  it('renders properly', () => {
    const wrapper = createWrapper({
      propsData: {
        pages: 5,
        modelValue: 1,
      },
    });
    expect(wrapper.classes()).toMatch(/_footer-stepper_/);
    expect(wrapper.classes()).toMatch(/_numeric_/);
  });

  it('passes props correctly', async () => {
    const wrapper = createWrapper({
      propsData: {
        pages: 5,
        variant: 'bullet',
        modelValue: 1,
      },
    });

    await wrapper.setProps({ variant: 'progress' });
    expect(wrapper.classes()).toMatch(/_progress_/);

    const next = wrapper.find('button ~ button span[class*=_label] span');
    expect(next.exists()).toBeTruthy();

    await wrapper.setProps({ variant: 'pill' });
    expect(wrapper.classes()).toMatch(/_pill_/);
  });
});
