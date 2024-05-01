import FooterStepper, { type Props } from '@/components/steppers/FooterStepper.vue';
import type { Meta, StoryFn, StoryObj } from '@storybook/vue';

const render: StoryFn<Props> = args => ({
  components: { FooterStepper },
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
    <FooterStepper v-model="value" v-bind="args" />`,
});

const meta: Meta<Props> = {
  argTypes: {
    arrowButtons: { control: 'boolean', table: { category: 'State' } },
    hideButtons: { control: 'boolean', table: { category: 'State' } },
    pages: { control: 'number', table: { category: 'State' } },
    value: {
      control: 'number',
      table: { category: 'State' },
    },
    variant: {
      control: 'select',
      options: ['numeric', 'bullet', 'progress', 'pill'],
      table: { category: 'State' },
    },
  },
  component: FooterStepper,
  parameters: {
    docs: {
      controls: { exclude: ['update:modelValue'] },
    },
  },
  render,
  tags: ['autodocs'],
  title: 'Components/FooterStepper',
};

type Story = StoryObj<Props>;

export const Default: Story = {
  args: {
    arrowButtons: false,
    pages: 5,
    value: 1,
    variant: 'numeric',
  },
};

export const DefaultWithoutButtons: Story = {
  args: {
    arrowButtons: false,
    hideButtons: true,
    pages: 5,
    value: 1,
    variant: 'numeric',
  },
};

export const Bullet: Story = {
  args: {
    arrowButtons: false,
    pages: 5,
    value: 1,
    variant: 'bullet',
  },
};

export const BulletWithoutButtons: Story = {
  args: {
    arrowButtons: false,
    hideButtons: true,
    pages: 5,
    value: 1,
    variant: 'bullet',
  },
};

export const Progress: Story = {
  args: {
    arrowButtons: false,
    pages: 5,
    value: 1,
    variant: 'progress',
  },
};

export const ProgressWithoutButtons: Story = {
  args: {
    arrowButtons: false,
    hideButtons: true,
    pages: 5,
    value: 1,
    variant: 'progress',
  },
};

export const Pills: Story = {
  args: {
    arrowButtons: false,
    pages: 5,
    value: 1,
    variant: 'pill',
  },
};

export const ArrowButtons: Story = {
  args: {
    arrowButtons: true,
    pages: 5,
    value: 1,
    variant: 'numeric',
  },
};

export const BulletWithArrows: Story = {
  args: {
    arrowButtons: true,
    pages: 5,
    value: 1,
    variant: 'bullet',
  },
};

export const ProgressWithArrows: Story = {
  args: {
    arrowButtons: true,
    pages: 5,
    value: 1,
    variant: 'progress',
  },
};

export default meta;
