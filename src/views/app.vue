<template>
  <!-- <progress :percent.sync="myProgress.percent" :options="myProgress.options"> </progress> -->
  <div id="app" class="wrapper">
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <router-view></router-view>
  </div>
</template>

<style scoped>
  @import '../../node_modules/bootstrap/dist/css/bootstrap.css';
</style>

<script>
import progress from '../../node_modules/vue-progressbar/vue-progressbar';
import appHeader from '../components/header/header.vue';
import appSidebar from '../components/sidebar/sidebar.vue';

export default {
  data() {
    return {
      myProgress: {
        percent: 0,
        options: {
          show: true,
          canSuccess: true,
          color: 'rgb(143, 255, 199)',
          failedColor: 'red',
          height: '2px',
        },
      },
    };
  },
  components: {
    progress,
    appHeader,
    appSidebar,
  },
  ready() {
    this.$progress.setHolder(this.myProgress);
  },
};
</script>
