<template>
  <div>
    <vue-toastr ref="toastr"></vue-toastr>
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import appHeader from '../components/header/index.vue';
import appSidebar from '../components/sidebar/index.vue';

export default {
  name: 'mainView',
  components: {
    appHeader,
    appSidebar,
  }
};
</script>
