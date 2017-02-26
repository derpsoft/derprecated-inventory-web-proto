import Vue from 'vue';

function VueComponent(component, propsData) {
  const Component = Vue.extend(component);
  const vm = propsData ? new Component({ propsData }) : new Component();
  return vm.$mount();
}

export default VueComponent;
