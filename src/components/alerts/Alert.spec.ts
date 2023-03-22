import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Alert from '@/components/alerts/Alert.vue';

const createWrapper = (options?: any) =>
  mount(Alert, {
    ...options,
    stubs: {
      RuiIcon: true,
    },
  });

describe('Forms/Alert', () => {
  it('renders properly', () => {
    const title = 'Text Field Label';
    const wrapper = createWrapper({
      propsData: {
        title,
      },
    });
    expect(wrapper.text()).toContain(title);
  });

  it('passes type props', async () => {
    const wrapper = createWrapper({ propsData: { title: 'Title' } });
    expect(wrapper.find('div[class*=alert]').classes()).toMatch(/_primary_/);

    await wrapper.setProps({ type: 'error' });
    expect(wrapper.find('div[class*=alert]').classes()).toMatch(/_error_/);

    await wrapper.setProps({ type: 'warning' });
    expect(wrapper.find('div[class*=alert]').classes()).toMatch(/_warning_/);

    await wrapper.setProps({ type: 'info' });
    expect(wrapper.find('div[class*=alert]').classes()).toMatch(/_info_/);

    await wrapper.setProps({ type: 'success' });
    expect(wrapper.find('div[class*=alert]').classes()).toMatch(/_success_/);
  });

  it('passes variant props', async () => {
    const wrapper = createWrapper({ propsData: { title: 'Title' } });
    expect(wrapper.find('div[class*=alert]').classes()).toMatch(/_default_/);

    await wrapper.setProps({ variant: 'filled' });
    expect(wrapper.find('div[class*=alert]').classes()).toMatch(/_filled_/);

    await wrapper.setProps({ variant: 'outlined' });
    expect(wrapper.find('div[class*=alert]').classes()).toMatch(/_outlined_/);
  });

  it('passes correct icon', async () => {
    const wrapper = createWrapper({ propsData: { title: 'Title' } });
    expect(wrapper.find('ruiicon-stub').exists()).toBeFalsy();

    await wrapper.setProps({ type: 'error' });

    expect(wrapper.find('ruiicon-stub').attributes('name')).toBe(
      'error-warning-line',
    );

    await wrapper.setProps({ type: 'warning' });
    expect(wrapper.find('ruiicon-stub').attributes('name')).toBe('alert-line');

    await wrapper.setProps({ type: 'info' });
    expect(wrapper.find('ruiicon-stub').attributes('name')).toBe(
      'information-line',
    );

    await wrapper.setProps({ type: 'success' });
    expect(wrapper.find('ruiicon-stub').attributes('name')).toBe(
      'checkbox-circle-line',
    );

    await wrapper.setProps({ icon: 'other-icon' });
    expect(wrapper.find('ruiicon-stub').attributes('name')).toBe('other-icon');
  });

  it('passes action text and the callback', async () => {
    const wrapper = createWrapper({ propsData: { title: 'Title' } });
    expect(wrapper.find('[class*=action]').exists()).toBeFalsy();

    await wrapper.setProps({ actionText: 'Action' });
    expect(wrapper.find('[class*=action]').exists()).toBeTruthy();
    await wrapper.find('[class*=action]').trigger('click');

    expect(wrapper.emitted('action')).toBeTruthy();
  });

  it('passes the close button callback', async () => {
    const wrapper = createWrapper({ propsData: { title: 'Title' } });
    expect(wrapper.find('[class*=close]').exists()).toBeFalsy();

    await wrapper.setProps({ closeable: true });
    expect(wrapper.find('[class*=close]').exists()).toBeTruthy();
    await wrapper.find('[class*=close]').trigger('click');

    expect(wrapper.emitted('close')).toBeTruthy();
  });
});
