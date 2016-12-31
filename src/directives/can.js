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

  'canReadCategories',
  'canUpsertCategories',
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
};
