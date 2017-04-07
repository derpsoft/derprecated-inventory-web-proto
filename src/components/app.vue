<template>
<div id="app" class="wrapper">
  <router-view></router-view>
  <app-insights></app-insights>
</div>
</template>

<script>
// @flow
import Pace from 'pace-progress';
import store from 'stores/store';
import appInsights from 'components/analytics/applicationInsights';
// $FlowFixMe
import 'bootstrap/less/bootstrap.less';
// $FlowFixMe
import 'toastr/toastr.less';
// $FlowFixMe
import 'font-awesome/css/font-awesome.css';
// $FlowFixMe
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
