// @flow
import _ from 'lodash';
import store from 'stores/store';

const guards = [
  'canReadUsers',
  'canManageUsers',

  'canManageInventory',
  'canManageSales',
  'canManageProducts',
  'canManageLocations',
  'canManageWarehouses',
  'canManageVendors',
  'canManageOrders',

  'canReadVendors',
  'canUpsertVendors',
  'canDeleteVendors',

  'canReadProducts',
  'canUpsertProducts',
  'canDeleteProducts',

  'canReadImages',
  'canUpsertImages',
  'canDeleteImages',

  'canReadWarehouses',
  'canUpsertWarehouses',
  'canDeleteWarehouses',

  'canReadLocations',
  'canUpsertLocations',
  'canDeleteLocations',

  'canReadCategories',
  'canUpsertCategories',
  'canDeleteCategories',

  'canReceiveInventory',
  'canDispatchInventory',

  'canReadSales',
  'canUpsertSales',
];

const toggleHide = (el: Object, shown: boolean = true) => {
  el.classList.toggle('hide', !shown);
};

export default (Vue: Object) => {
  guards.forEach((v) => {
    Vue.directive(v, {
      bind: (el) => {
        toggleHide(el, store.getters[v]);
        store.watch(() => store.getters[v], current => toggleHide(el, current));
      }
    });
  });

  Vue.directive('canAny', {
    bind: (el: Object, binding: Object) => {
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
