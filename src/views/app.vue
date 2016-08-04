<style lang="less">
 @import '../../node_modules/bootstrap/less/bootstrap.less';
 @import '../assets/stylesheets/style.less';
</style>

<template>
  <div id="app" class="wrapper">
      <router-view></router-view>
  </div>
</template>

<script>
// import pace from 'pace';
import Auth from '../services/auth.js';

class App {
  constructor() {
    this.auth = new Auth();
  }
}
// pace.start();

export default new App;
</script>
