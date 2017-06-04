<template>
<div>
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
// import 'bootstrap/scss/bootstrap.scss';
// $FlowFixMe
import 'toastr/toastr.scss';
// $FlowFixMe
import 'font-awesome/css/font-awesome.css';
// $FlowFixMe
import '../assets/stylesheets/style.scss';

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
