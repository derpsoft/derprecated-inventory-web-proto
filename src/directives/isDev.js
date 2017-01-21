const hide = (el) => {
  el.style.setProperty('display', 'none', 'important');
};
export default (Vue) => {
  Vue.directive('is-dev', {
    bind: (el) => {
      if (process.env.NODE_ENV !== 'development') {
        hide(el);
      }
    }
  });
};
