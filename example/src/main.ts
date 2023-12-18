import '@/assets/main.css';
import '@rotki/ui-library-compat/style.css';
import '@fontsource/roboto/latin.css';

import {
  PiniaVuePlugin,
  createPinia,
  setActivePinia,
  storeToRefs,
} from 'pinia';
import {
  RiAddFill,
  RiAlertLine,
  RiAlignCenter,
  RiAlignJustify,
  RiAlignLeft,
  RiAlignRight,
  RiArrowDownCircleLine,
  RiArrowDownSLine,
  RiArrowLeftLine,
  RiArrowLeftSLine,
  RiArrowRightLine,
  RiArrowRightSLine,
  RiArrowUpSLine,
  RiCheckboxCircleLine,
  RiCloseFill,
  RiErrorWarningLine,
  RiInformationLine,
  RiMacbookLine,
  RiMoonLine,
  RiStarFill,
  RiSunLine,
  createRui,
} from '@rotki/ui-library-compat';
import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import { useCounterStore } from '@/stores/counter';

Vue.use(PiniaVuePlugin);
const pinia = createPinia();
setActivePinia(pinia);

const { itemsPerPage } = storeToRefs(useCounterStore());

const RuiPlugin = createRui({
  theme: {
    icons: [
      RiMoonLine,
      RiStarFill,
      RiSunLine,
      RiMacbookLine,
      RiArrowLeftLine,
      RiArrowRightLine,
      RiAddFill,
      RiAlertLine,
      RiAlignCenter,
      RiAlignLeft,
      RiAlignRight,
      RiAlignJustify,
      RiCheckboxCircleLine,
      RiCloseFill,
      RiInformationLine,
      RiErrorWarningLine,
      RiArrowLeftSLine,
      RiArrowRightSLine,
      RiArrowUpSLine,
      RiArrowDownSLine,
      RiArrowDownCircleLine,
    ],
  },
  defaults: {
    table: {
      itemsPerPage,
    },
  },
});
Vue.use(RuiPlugin);

new Vue({
  // @ts-ignore
  pinia,
  router,
  setup() {
    RuiPlugin.setupProvide();
  },
  render: (h) => h(App),
}).$mount('#app');
