// @flow
const hide = (el: Object) => {
  el.style.setProperty('display', 'none', 'important');
};
export default (Vue: Object) => {
  Vue.directive('is-dev', {
    bind: (el) => {
      if (!~['local', 'development'].indexOf(process.env.NODE_ENV)) {
        hide(el);
      }
    }
  });
};
