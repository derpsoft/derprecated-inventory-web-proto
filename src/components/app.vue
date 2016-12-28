<template>
  <div id="app" class="wrapper">
    <vue-toastr ref="toastr"></vue-toastr>
    <router-view></router-view>
  </div>
</template>

<script>
// import Toastr from 'vue-toastr';
import Pace from 'pace-progress';
import 'vue-toastr/src/vue-toastr.less';
import 'bootstrap/less/bootstrap.less';
import 'font-awesome/css/font-awesome.css';
import '../assets/stylesheets/style.less';

import store from '../stores/store';


export default {
  name: 'appView',
  store,
  mounted() {
    Pace.start();
  }
};
</script>
