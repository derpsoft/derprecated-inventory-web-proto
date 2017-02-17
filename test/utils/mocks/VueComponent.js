
import Vue from 'vue';

function VueComponent(component) {
  const Component = Vue.extend(component).$mount();
  const vm = new Component();
  return vm.$mount();
}

export default VueComponent;
