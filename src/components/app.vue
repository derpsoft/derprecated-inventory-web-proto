<template>
<div id="app" class="wrapper">
  <router-view></router-view>
  <app-insights></app-insights>
</div>
</template>

<script>
import Pace from 'pace-progress';
import store from 'stores/store';
import appInsights from 'components/analytics/applicationInsights';
import 'bootstrap/less/bootstrap.less';
import 'toastr/toastr.less';
import 'font-awesome/css/font-awesome.css';
import 'assets/stylesheets/style.less';

export default {
  name: 'appView',
  store,
  components: {
    appInsights,
  },
  mounted() {
    Pace.start();
  }
};
</script>
