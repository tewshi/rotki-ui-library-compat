import Vue, { type VNode } from 'vue';
import { isClient } from '@vueuse/core';

function createTeleportNode(tag: string, selector: string) {
  if (!isClient) {
    return;
  }

  const parent = document.querySelector('body');
  const wrapper = document.createElement(tag);
  wrapper.id = selector.substring(1);
  parent?.appendChild(wrapper);
  return wrapper;
}

type Slot = (...args: any[]) => VNode[];

const TeleportContainer = Vue.extend({
  name: 'RuiTeleportContainer',
  props: {
    tag: { type: String, required: false, default: 'DIV' },
    id: { type: String, required: true },
  },
  data() {
    const children: Record<string, VNode[] | Slot> = {};
    return {
      children,
    };
  },
  computed: {
    vNodes() {
      const nodes: VNode[] = [];
      for (const tp in this.children) {
        const slotContent = this.children[tp];
        if (!slotContent) {
          continue;
        }
        const children =
          typeof slotContent === 'function' ? slotContent() : slotContent;

        for (const [i, child] of children.entries()) {
          child.key = `${tp}-${i}`;
          nodes.push(child);
        }
      }
      return nodes;
    },
  },
  destroyed() {
    this.$el?.parentNode?.removeChild(this.$el);
  },
  methods: {
    updateNodes(to: string, children: VNode[] | Slot) {
      this.children = {
        ...this.children,
        [to]: children,
      };
    },
    clearNodes(to: string) {
      const { [to]: rem, ...children } = this.children;
      this.children = children;
    },
  },
  render(h): VNode {
    const nodes = this.vNodes;
    if (!nodes || nodes.length === 0) {
      return h(this.tag, {
        attrs: {
          id: this.id,
        },
      });
    }

    return h(
      this.tag,
      {
        attrs: {
          id: this.id,
        },
      },
      nodes,
    );
  },
});

export default TeleportContainer;

export const createTeleport = (
  tag: string = 'DIV',
  id = generateId('rui-teleport-container'),
) =>
  new TeleportContainer({
    el: createTeleportNode(get(tag), `#${id}`),
    propsData: {
      id,
      tag: get(tag),
    },
  });
