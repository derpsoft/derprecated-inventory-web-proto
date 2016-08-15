<template>
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <router-view></router-view>
</template>

<script>
import appHeader from '../components/header/header.vue';
import appSidebar from '../components/sidebar/sidebar.vue';

class Main {
  constructor() {
    this.components = {
      appHeader,
      appSidebar,
    };
  }
}
// pace.start();
const main = new Main;
export default main;
</script>
