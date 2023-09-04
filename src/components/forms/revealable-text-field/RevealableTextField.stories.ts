import { type Meta, type StoryFn, type StoryObj } from '@storybook/vue';
import { contextColors } from '@/consts/colors';
import { type Props } from '@/components/forms/text-field/TextField.vue';
import RevealableTextField from './RevealableTextField.vue';

const render: StoryFn<Props> = (args) => ({
  components: { RevealableTextField },
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
  template: `<RevealableTextField v-model="modelValue" v-bind="args" />`,
});

const meta: Meta<Props> = {
  title: 'Components/Forms/RevealableTextField',
  component: RevealableTextField,
  tags: ['autodocs'],
  render,
  argTypes: {
    value: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    appendIcon: { control: 'text' },
    prependIcon: { control: 'text' },
    errorMessages: { control: 'array', defaultValue: [] },
    hideDetails: { control: 'boolean', table: { category: 'State' } },
    dense: { control: 'boolean', table: { category: 'State' } },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined'],
      table: { category: 'State' },
    },
    disabled: { control: 'boolean', table: { category: 'State' } },
    color: {
      control: 'select',
      options: contextColors,
      table: { category: 'State' },
    },
  },
  parameters: {
    docs: {
      controls: { exclude: ['default'] },
    },
  },
};

type Story = StoryObj<Props>;

export const Default: Story = {
  args: {
    label: 'Password',
    placeholder: 'Placeholder',
    variant: 'outlined',
  },
};

export default meta;
