import { contextColors } from '@/consts/colors';
import * as Icons from '@/icons';
import { default as Alert, type Props } from './Alert.vue';
import type { Meta, StoryFn, StoryObj } from '@storybook/vue';

const render: StoryFn<Props> = args => ({
  components: { Alert },
  setup() {
    return { args };
  },
  template: `<Alert v-bind="args" class="w-[400px]" />`,
});

const meta: Meta<Props> = {
  argTypes: {
    actionText: { control: 'text' },
    description: { control: 'text' },
    icon: {
      control: 'select',
      options: Object.values(Icons).map(({ name }) => name.slice(3)),
    },
    title: { control: 'text' },
    type: { control: 'select', options: contextColors },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined'],
      table: { category: 'State' },
    },
  },
  component: Alert,
  render,
  tags: ['autodocs'],
  title: 'Components/Alert',
};

type Story = StoryObj<Props>;

export const Default: Story = {
  args: {
    description: 'Description',
    title: 'Title',
  },
};

export const Error: Story = {
  args: {
    description: 'Description',
    title: 'Title',
    type: 'error',
  },
};

export const Warning: Story = {
  args: {
    description: 'Description',
    title: 'Title',
    type: 'warning',
  },
};

export const Info: Story = {
  args: {
    description: 'Description',
    title: 'Title',
    type: 'info',
  },
};

export const Success: Story = {
  args: {
    description: 'Description',
    title: 'Title',
    type: 'success',
  },
};

export const Filled: Story = {
  args: {
    description: 'Description',
    title: 'Title',
    type: 'error',
    variant: 'filled',
  },
};

export const Outlined: Story = {
  args: {
    description: 'Description',
    title: 'Title',
    type: 'error',
    variant: 'outlined',
  },
};

export const WithActionButton: Story = {
  args: {
    actionText: 'Action',
    description: 'Description',
    title: 'Title',
    type: 'error',
  },
};

export default meta;
