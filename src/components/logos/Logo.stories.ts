import Logo, { type Props } from '@/components/logos/Logo.vue';
import type { Meta, StoryFn, StoryObj } from '@storybook/vue';

const render: StoryFn<Props> = args => ({
  components: { Logo },
  setup() {
    return { args };
  },
  template: `<Logo v-bind="args" />`,
});

const meta: Meta<Props> = {
  argTypes: {
    branch: { control: 'text' },
    logo: { control: 'text' },
    size: { control: 'text' },
    text: { control: 'boolean' },
  },
  component: Logo,
  render,
  tags: ['autodocs'],
  title: 'Components/Logo',
};

type Story = StoryObj<Props>;

export const Default: Story = {
  args: {},
};

export const WithText: Story = {
  args: {
    text: true,
  },
};

export const WithCustomSrc: Story = {
  args: {
    logo: 'drawer',
  },
};

export const WithCustomSrcAndFallback: Story = {
  args: {
    logo: 'notfoundkey',
  },
};

export default meta;
