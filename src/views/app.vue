<style lang="less" async>
 @import '../../node_modules/bootstrap/less/bootstrap.less';
 @import '../assets/stylesheets/style.less';
</style>

<template>

<div id="app" class="wrapper">
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <router-view></router-view>
</div>

</template>

<script>
import appHeader from '../components/header/header.vue';
import appSidebar from '../components/sidebar/sidebar.vue';
// import pace from 'pace';
import Auth from '../services/auth';

class App {
  constructor() {
    this.auth = new Auth({
      login: '/login',
    });

    this.components = {
      appHeader,
      appSidebar,
    };
  }
}
// pace.start();
const app = new App;
export default app;
</script>
