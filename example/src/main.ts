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
  RiDeleteBinLine,
  RiErrorWarningLine,
  RiFileCopyLine,
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
import { useDefaultsStore } from '@/stores/defaults';

Vue.use(PiniaVuePlugin);
const pinia = createPinia();
setActivePinia(pinia);

const { itemsPerPage, stickyOffset } = storeToRefs(useDefaultsStore());

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
      RiDeleteBinLine,
      RiFileCopyLine,
    ],
  },
  defaults: {
    table: {
      itemsPerPage,
      stickyOffset,
      globalItemsPerPage: false,
      limits: [5, 10, 15, 25, 50, 100, 200],
    },
  },
});
Vue.use(RuiPlugin);

new Vue({
  pinia,
  router,
  setup() {
    RuiPlugin.setupProvide();
  },
  render: h => h(App),
}).$mount('#app');
