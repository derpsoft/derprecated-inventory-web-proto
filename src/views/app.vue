<template>
  <div id="app" class="wrapper">
      <router-view></router-view>
  </div>
</template>

<script>
import 'bootstrap/less/bootstrap.less';
import 'font-awesome/css/font-awesome.css';
import '../assets/stylesheets/style.less';

import Pace from 'pace-progress';
import Auth from '../services/auth.js';

class App {
  constructor() {
    this.auth = new Auth();
    Pace.start();
  }
}

export default new App;
</script>
