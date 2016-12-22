<template>
<div id="app" class="wrapper">
  <router-view></router-view>
</div>
</template>

<script>
import Pace from 'pace-progress';
import 'bootstrap/less/bootstrap.less';
import 'toastr/toastr.less';
import 'font-awesome/css/font-awesome.css';

import store from '../stores/store';
import '../assets/stylesheets/style.less';

export default {
  name: 'appView',
  store,
  mounted() {
    Pace.start();
  }
};
</script>
