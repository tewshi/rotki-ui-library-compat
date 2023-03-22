// setup.js file
import { vi } from 'vitest';
import { ref } from 'vue';
import * as Icons from '../../src/all-icons';
import { useIcons } from '../../src/composables/icons';

const { registerIcons } = useIcons();
registerIcons(Object.values(Icons));

vi.mock('vue', async () => {
  const mod = await vi.importActual<typeof import('vue')>('vue');
  mod.default.config.devtools = false;
  mod.default.config.productionTip = false;
  return {
    ...mod,
    useListeners: vi.fn(),
    useCssModule: vi.fn().mockReturnValue(
      new Proxy(
        {},
        {
          get: (o, name) => {
            if (name === '__v_isRef') {
              return ref(name);
            }
            if (name === '__ob__') {
              return ref(name);
            }

            return `abc_${String(name)}_abc`;
          },
        },
      ),
    ),
  };
});
