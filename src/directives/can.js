import store from '../stores/store';

const guards = [
  'canReadUsers',
  'canUpsertUsers',

  'canReadVendors',
  'canUpsertVendors',
];

export default (Vue) => {
  guards.forEach((v) => {
    Vue.directive(v, (el) => {
      if (!store.getters[v] && !el.classList.contains('hide')) {
        el.classList.add('hide');
      } else if (el.classList.contains('hide')) {
        el.classList.remove('hide');
      }
    });
  });
};
