import Radio from '@/components/forms/radio-button/radio/Radio.vue';
import { type Props, default as RadioGroup } from './RadioGroup.vue';
import type { Meta, StoryFn, StoryObj } from '@storybook/vue';

const render: StoryFn<Props> = args => ({
  components: { Radio, RadioGroup },
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
  template: `<RadioGroup v-bind="args" v-model="modelValue">
    <div>
      <Radio internal-value="yes">yes</Radio>
      <Radio internal-value="no">no</Radio>
    </div>
  </RadioGroup>`,
});

const meta: Meta<Props> = {
  argTypes: {
    errorMessages: { control: 'array', defaultValue: [] },
    hideDetails: { control: 'boolean' },
    hint: { control: 'text' },
    inline: { control: 'boolean' },
    value: { control: 'text' },
  },
  component: RadioGroup,
  render,
  tags: ['autodocs'],
  title: 'Components/Forms/Radio/RadioGroup',
};

type Story = StoryObj<Props>;

export const Default: Story = {
  args: {},
};

export const Inline: Story = {
  args: {
    inline: true,
  },
};

export const WithErrorMessage: Story = {
  args: {
    errorMessages: ['With error messages'],
  },
};

export const WithHint: Story = {
  args: {
    hint: 'With hint',
  },
};

export const HideDetails: Story = {
  args: {
    hideDetails: true,
    hint: 'Hint (should be invisible)',
  },
};

export default meta;
