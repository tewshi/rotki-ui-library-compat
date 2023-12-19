import { createRui } from '../src';
import * as Icons from '../src/all-icons';
import Vue from 'vue';

const RuiPlugin = createRui({
  theme: {
    icons: Object.values(Icons),
  }
})

Vue.use(RuiPlugin);

export const vueInstance = new Vue({ template: '<div />' }).$mount();
