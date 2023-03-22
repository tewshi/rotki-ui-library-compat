import { defineComponent } from 'vue';

export default defineComponent({
  functional: true,
  render(_h, ctx) {
    const { vNode, key, ...props } = ctx.props;
    if (vNode.componentOptions) {
      vNode.componentOptions.propsData = {
        ...vNode.componentOptions.propsData,
        ...props,
      };
      vNode.componentOptions.listeners = {
        ...vNode.componentOptions.listeners,
        ...ctx.listeners,
      };
    }

    vNode.key = key;
    vNode.data = {
      ...vNode.data,
      class: {
        [ctx.data.class]: true,
      },
    };
    return vNode;
  },
});
