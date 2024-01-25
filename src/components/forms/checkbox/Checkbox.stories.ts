import { contextColors } from '@/consts/colors';
import { default as Checkbox, type Props } from './Checkbox.vue';
import type { Meta, StoryFn, StoryObj } from '@storybook/vue';

type PropsAndLabel = Props & { label: string };

const render: StoryFn<PropsAndLabel> = args => ({
  components: { Checkbox },
  setup() {
    const modelValue = computed({
      get() {
        return args.value;
      },
      set(val) {
        args.value = val;
      },
    });

    const indeterminate = computed({
      get() {
        return args.indeterminate;
      },
      set(val) {
        args.indeterminate = val;
      },
    });
    return { args, indeterminate, modelValue };
  },
  template: `
  <Checkbox
    v-bind="args"
    v-model="modelValue"
    :indeterminate.sync="indeterminate"
  >
    {{ args.label }}
  </Checkbox>`,
});

const meta: Meta<PropsAndLabel> = {
  argTypes: {
    color: { control: 'select', options: contextColors },
    disabled: { control: 'boolean', table: { category: 'State' } },
    errorMessages: { control: 'array', defaultValue: [] },
    hideDetails: { control: 'boolean' },
    hint: { control: 'text' },
    indeterminate: { control: 'boolean' },
    label: { control: 'text' },
    size: { control: 'select', options: ['medium', 'sm', 'lg'] },
    value: { control: 'boolean' },
  },
  component: Checkbox,
  parameters: {
    docs: {
      controls: { exclude: ['default'] },
    },
  },
  render,
  tags: ['autodocs'],
  title: 'Components/Forms/Checkbox',
};

type Story = StoryObj<PropsAndLabel>;

export const Checked: Story = {
  args: {
    value: true,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Primary: Story = {
  args: {
    color: 'primary',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'With Label',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled',
  },
};

export const WithErrorMessage: Story = {
  args: {
    errorMessages: ['With error messages'],
    label: 'Label',
  },
};

export const WithHint: Story = {
  args: {
    hint: 'With hint',
    label: 'Label',
  },
};

export const HideDetails: Story = {
  args: {
    hideDetails: true,
    hint: 'Hint (should be invisible)',
    label: 'Label',
  },
};

export default meta;
