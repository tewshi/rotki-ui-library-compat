import { RuiPlugin } from '../src';
import * as Icons from '../src/all-icons';
import Vue from 'vue';

Vue.use(RuiPlugin, {
  icons: Object.values(Icons),
});

export const vueInstance = new Vue({ template: '<div />' }).$mount();
