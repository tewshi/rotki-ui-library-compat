import { contextColors } from '@/consts/colors';
import { default as Radio, type RadioProps } from './Radio.vue';
import type { Meta, StoryFn, StoryObj } from '@storybook/vue';

type PropsAndLabel = RadioProps & { label: string };

const render: StoryFn<PropsAndLabel> = args => ({
  components: { Radio },
  setup() {
    const modelValue = computed({
      get() {
        return args.value;
      },
      set(val) {
        args.value = val;
      },
    });
    return { args, modelValue };
  },
  template: `<Radio v-bind="args" v-model="modelValue">
  {{ args.default }}
  </Radio>`,
});

const meta: Meta<PropsAndLabel> = {
  argTypes: {
    color: { control: 'select', options: contextColors },
    disabled: { control: 'boolean', table: { category: 'State' } },
    errorMessages: { control: 'array', defaultValue: [] },
    hideDetails: { control: 'boolean' },
    hint: { control: 'text' },
    internalValue: { control: 'text' },
    label: { control: 'text' },
    size: { control: 'select', options: ['medium', 'sm', 'lg'] },
    value: { control: 'text' },
  },
  component: Radio,
  parameters: {
    docs: {
      controls: { exclude: ['default'] },
    },
  },
  render,
  tags: ['autodocs'],
  title: 'Components/Forms/Radio/Radio',
};

type Story = StoryObj<PropsAndLabel>;

export const Checked: Story = {
  args: {
    internalValue: 'test',
    value: '',
  },
};

export const Large: Story = {
  args: {
    internalValue: 'test',
    size: 'lg',
    value: '',
  },
};

export const Small: Story = {
  args: {
    internalValue: 'test',
    size: 'sm',
    value: '',
  },
};

export const Primary: Story = {
  args: {
    color: 'primary',
    internalValue: 'test',
    value: '',
  },
};

export const WithLabel: Story = {
  args: {
    internalValue: 'test',
    label: 'With Label',
    value: '',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    internalValue: 'test',
    label: 'Disabled',
  },
};

export const WithErrorMessage: Story = {
  args: {
    errorMessages: ['With error messages'],
    internalValue: 'test',
    label: 'Label',
  },
};

export const WithHint: Story = {
  args: {
    hint: 'With hint',
    internalValue: 'test',
    label: 'Label',
  },
};

export const HideDetails: Story = {
  args: {
    hideDetails: true,
    hint: 'Hint (should be invisible)',
    internalValue: 'test',
    label: 'Label',
  },
};

export default meta;
