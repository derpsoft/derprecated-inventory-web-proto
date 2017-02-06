<template>
  <div>
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import appHeader from 'components/header/index';
import appSidebar from 'components/sidebar/index';

export default {
  name: 'mainView',
  components: {
    appHeader,
    appSidebar,
  }
};
</script>
