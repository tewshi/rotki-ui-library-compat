import Vue from 'vue';

export default Vue.extend({
  name: 'RuiTeleportContainer',
  props: {
    nodes: { type: Function, required: false, default: () => null },
    tag: { type: String, required: false, default: 'DIV' },
  },
  data() {
    return { updatedNodes: this.nodes };
  },
  destroyed() {
    this.$el?.parentNode?.removeChild(this.$el);
  },
  render(h) {
    const nodes = this.updatedNodes?.();
    if (!nodes) {
      return h();
    }

    return nodes.length === 1 && !nodes[0].text ? nodes : h(this.tag, nodes);
  },
});
