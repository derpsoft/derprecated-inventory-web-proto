<template>
<div class="app">
  <main-header></main-header>
  <div class="app-body">
    <sidebar></sidebar>
    <main class="main">
      <breadcrumb :list="list" />
      <div class="container-fluid">
        <router-view></router-view>
      </div>
    </main>
    <main-aside></main-aside>
  </div>
  <mainFooter></mainFooter>
</div>
</template>

<script>
import mainHeader from 'components/header/index';
import sidebar from 'components/sidebar/index';
import mainAside from 'components/aside/index';
import breadcrumb from 'components/shared/breadcrumb';
import mainFooter from 'components/footer/index';

export default {
  name: 'mainView',
  components: {
    mainHeader,
    sidebar,
    breadcrumb,
    mainAside,
    mainFooter,
  },
  computed: {
    name() {
      return this.$route.name;
    },
    list () {
      return this.$route.matched;
    }
  }
};

</script>
