<template>
  <div id="app" class="wrapper">
      <router-view></router-view>
  </div>
</template>

<script>
import 'bootstrap/less/bootstrap.less';
import 'font-awesome/css/font-awesome.css';
import 'toastr/toastr.less';
import '../assets/stylesheets/style.less';

import Pace from 'pace-progress';
import store from '../stores/store.js';

class App {
  constructor() {
    this.store = store;
    Pace.start();
  }
}

export default new App();
</script>
