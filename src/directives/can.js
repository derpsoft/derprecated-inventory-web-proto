import _ from 'lodash';
import store from '../stores/store';

const guards = [
  'canReadUsers',
  'canUpsertUsers',

  'canReadVendors',
  'canUpsertVendors',

  'canReadProducts',
  'canUpsertProducts',

  'canReadWarehouses',
  'canUpsertWarehouses',

  'canReadLocations',
  'canUpsertLocations',

  'canReadCategories',
  'canUpsertCategories',

  'canReceiveInventory',
  'canDispatchInventory',
];

const toggleHide = (el, shown = true) => {
  if (shown && el.classList.contains('hide')) {
    el.classList.remove('hide');
  } else if (!el.classList.contains('hide')) {
    el.classList.add('hide');
  }
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
      const { term, guards } = binding.value;
      /* eslint-enable no-shadow */
      const op = term === 'or' ? _.some : _.every;
      const check = () => op(guards, v => store.getters[v]);

      toggleHide(el, check());
      guards.forEach(v => store.watch(
        () => store.getters[v],
        () => toggleHide(el, check())
      ));
    }
  });
};
