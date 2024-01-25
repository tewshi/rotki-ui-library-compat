import { type Props, default as SimpleSelect } from './SimpleSelect.vue';
import type { Meta, StoryFn, StoryObj } from '@storybook/vue';

const render: StoryFn<Props> = args => ({
  components: { SimpleSelect },
  setup() {
    const value = computed({
      get() {
        return args.value;
      },
      set(val) {
        args.value = val;
      },
    });

    return { args, value };
  },
  template: `<SimpleSelect v-bind="args" v-model="value" />`,
});

const meta: Meta<Props> = {
  args: {
    disabled: false,
    options: [...new Array(10)].map((_, i) => `Option ${i}`),
    variant: 'default',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    name: { control: 'string' },
    options: { control: 'array', defaultValue: [] },
    value: { control: 'string' },
    variant: {
      control: 'select',
      defaultValue: 'default',
      options: ['default', 'outlined'],
    },
  },
  component: SimpleSelect,
  parameters: {
    docs: {
      controls: { exclude: ['input'] },
    },
  },
  render,
  tags: ['autodocs'],
  title: 'Components/Forms/SimpleSelect',
};

type Story = StoryObj<Props>;

export const Default: Story = {
  args: {
    value: 'Option 1',
  },
};

export const DefaultDisabled: Story = {
  args: {
    disabled: true,
    value: 'Option 1',
  },
};

export const Outlined: Story = {
  args: {
    value: 'Option 1',
    variant: 'outlined',
  },
};

export const OutlinedDisabled: Story = {
  args: {
    disabled: true,
    value: 'Option 1',
    variant: 'outlined',
  },
};

export default meta;
