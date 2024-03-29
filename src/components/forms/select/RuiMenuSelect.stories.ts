import RuiMenuSelect, { type Props } from './RuiMenuSelect.vue';
import type { Meta, StoryFn, StoryObj } from '@storybook/vue';

interface SelectOption {
  id: string | number;
  label: string | number;
}

const render: StoryFn<Props> = args => ({
  components: { RuiMenuSelect },
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
  template: `
    <RuiMenuSelect v-bind="args" v-model="value" />`,
});

const options: SelectOption[] = [
  { id: '1', label: 'Germany' },
  { id: '2', label: 'Nigeria' },
  { id: '3', label: 'Greece' },
  { id: '4', label: 'Indonesia' },
  { id: '5', label: 'Spain' },
  { id: '6', label: 'India' },
  { id: '7', label: 'France' },
  { id: '8', label: 'England' },
  ...[...new Array(12).keys()].map(index => ({
    id: index + 9,
    label: index + 9,
  })),
];

const meta: Meta<Props> = {
  args: {
    disabled: false,
    options,
  },
  argTypes: {
    dense: { control: 'boolean' },
    disabled: { control: 'boolean' },
    options: { control: 'array', defaultValue: [] },
    value: { control: 'string' },
    variant: {
      control: 'select',
      defaultValue: 'default',
      options: ['default', 'outlined', 'filled'],
    },
  },
  component: RuiMenuSelect as any,
  parameters: {
    docs: {
      controls: { exclude: ['update:model-value'] },
    },
  },
  render,
  tags: ['autodocs'],
  title: 'Components/Forms/MenuSelect',
};

type Story = StoryObj<Props>;

export const Default: Story = {
  args: {
    keyAttr: 'id',
    textAttr: 'label',
    value: null,
  },
};

export const DefaultDisabled: Story = {
  args: {
    disabled: true,
    keyAttr: 'id',
    textAttr: 'label',
    value: null,
  },
};

export const Outlined: Story = {
  args: {
    keyAttr: 'id',
    textAttr: 'label',
    value: null,
    variant: 'outlined',
  },
};

export const OutlinedDisabled: Story = {
  args: {
    disabled: true,
    keyAttr: 'id',
    textAttr: 'label',
    value: null,
    variant: 'outlined',
  },
};

export const OutlinedDense: Story = {
  args: {
    dense: false,
    disabled: true,
    keyAttr: 'id',
    textAttr: 'label',
    value: null,
    variant: 'outlined',
  },
};

export const OutlinedDisabledDense: Story = {
  args: {
    dense: true,
    disabled: true,
    keyAttr: 'id',
    textAttr: 'label',
    value: null,
    variant: 'outlined',
  },
};

export default meta;
