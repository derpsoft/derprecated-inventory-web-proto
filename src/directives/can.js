import _ from 'lodash';
import store from 'stores/store';

const guards = [
  'canReadUsers',
  'canUpsertUsers',

  'canReadVendors',
  'canUpsertVendors',

  'canReadProducts',
  'canUpsertProducts',
  'canDeleteProducts',

  'canReadWarehouses',
  'canUpsertWarehouses',

  'canReadLocations',
  'canUpsertLocations',

  'canReadCategories',
  'canUpsertCategories',

  'canReceiveInventory',
  'canDispatchInventory',

  'canReadSales',
  'canUpsertSales',
];

const toggleHide = (el, shown = true) => {
  el.classList.toggle('hide', !shown);
};

export default (Vue) => {
  guards.forEach((v) => {
    Vue.directive(v, {
      bind: (el) => {
        toggleHide(el, store.getters[v]);
        store.watch(() => store.getters[v], current => toggleHide(el, current));
      }
    });
  });

  Vue.directive('canAny', {
    bind: (el, binding) => {
      /* eslint-disable no-shadow */
      const {
        term,
        guards
      } = binding.value;
      /* eslint-enable no-shadow */

      const op = term === 'or' ? _.some : _.every;
      const check = () => op(guards, v => store.getters[v]);

      toggleHide(el, check());
      guards.forEach((v) => {
        store.watch(
          () => store.getters[v],
          () => toggleHide(el, check())
        );
      });
    }
  });
};
