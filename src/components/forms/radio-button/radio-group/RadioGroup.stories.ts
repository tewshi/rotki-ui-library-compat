import { type Meta, type StoryFn, type StoryObj } from '@storybook/vue';
import Radio from '@/components/forms/radio-button/radio/Radio.vue';
import { type Props, default as RadioGroup } from './RadioGroup.vue';

const render: StoryFn<Props> = (args) => ({
  components: { RadioGroup, Radio },
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
  title: 'Components/Forms/Radio/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  render,
  argTypes: {
    value: { control: 'text' },
    inline: { control: 'boolean' },
    hint: { control: 'text' },
    errorMessages: { control: 'array', defaultValue: [] },
    hideDetails: { control: 'boolean' },
  },
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
    hint: 'Hint (should be invisible)',
    hideDetails: true,
  },
};

export default meta;
