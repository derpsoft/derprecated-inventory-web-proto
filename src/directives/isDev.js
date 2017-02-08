const hide = (el) => {
  el.style.setProperty('display', 'none', 'important');
};
export default (Vue) => {
  Vue.directive('is-dev', {
    bind: (el) => {
      if (!~['local', 'development'].indexOf(process.env.NODE_ENV)) {
        hide(el);
      }
    }
  });
};
