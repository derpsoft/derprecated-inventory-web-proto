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
import '../assets/stylesheets/style.less';
import store from '../stores/store';


export default {
  name: 'appView',
  store,
  components: {
  },
  mounted() {
    Pace.start();
    console.log(process.env.NODE_ENV);
  }
};
</script>
