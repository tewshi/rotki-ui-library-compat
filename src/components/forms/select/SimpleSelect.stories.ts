import { type Meta, type StoryFn, type StoryObj } from '@storybook/vue';
import { type Props, default as SimpleSelect } from './SimpleSelect.vue';

const render: StoryFn<Props> = (args) => ({
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
  title: 'Components/Forms/SimpleSelect',
  component: SimpleSelect,
  tags: ['autodocs'],
  render,
  argTypes: {
    value: { control: 'string' },
    name: { control: 'string' },
    options: { control: 'array', defaultValue: [] },
    disabled: { control: 'boolean' },
    variant: {
      control: 'select',
      defaultValue: 'default',
      options: ['default', 'outlined'],
    },
  },
  args: {
    options: [...new Array(10)].map((_, i) => `Option ${i}`),
    variant: 'default',
    disabled: false,
  },
  parameters: {
    docs: {
      controls: { exclude: ['input'] },
    },
  },
};

type Story = StoryObj<Props>;

export const Default: Story = {
  args: {
    value: 'Option 1',
  },
};

export const DefaultDisabled: Story = {
  args: {
    value: 'Option 1',
    disabled: true,
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
    value: 'Option 1',
    variant: 'outlined',
    disabled: true,
  },
};

export default meta;
