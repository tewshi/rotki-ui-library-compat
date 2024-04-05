import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import FooterStepper from '@/components/steppers/FooterStepper.vue';

const createWrapper = (options: any) => mount(FooterStepper, options);

describe('footerStepper', () => {
  it('renders properly', () => {
    const wrapper = createWrapper({
      propsData: {
        pages: 5,
        value: 1,
      },
    });
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([expect.stringMatching(/_footer-stepper_/)]),
    );
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([expect.stringMatching(/_numeric_/)]),
    );
  });

  it('passes props correctly', async () => {
    const wrapper = createWrapper({
      propsData: {
        pages: 5,
        value: 1,
        variant: 'bullet',
      },
    });

    await wrapper.setProps({ variant: 'progress' });
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([expect.stringMatching(/_progress_/)]),
    );

    const next = wrapper.find('button ~ button span[class*=_label] span');
    expect(next.exists()).toBeTruthy();

    await wrapper.setProps({ variant: 'pill' });
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([expect.stringMatching(/_pill_/)]),
    );
  });
});
