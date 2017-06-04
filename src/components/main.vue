<template>
<div class="app">
  <main-header></main-header>
  <div class="app-body">
    <sidebar></sidebar>
    <router-view></router-view>
    <main-aside></main-aside>
  </div>
  <mainFooter></mainFooter>
</div>
</template>

<script>
import mainHeader from 'components/header/index';
import sidebar from 'components/sidebar/index';
import mainAside from 'components/aside/index';
import mainFooter from 'components/footer/index';

export default {
  name: 'mainView',
  components: {
    mainHeader,
    sidebar,
    mainAside,
    mainFooter,
  }
};

</script>
