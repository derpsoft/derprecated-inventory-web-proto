<style lang="less" async>
// @import '../../node_modules/bootstrap/less/bootstrap.less';
// @import '../assets/stylesheets/style.css';

</style>

<template>

<div id="app" class="wrapper">
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <span style="color: #fff;">test</span>
    <router-view></router-view>
</div>

</template>

<script>

import flot from '../../node_modules/flot';
import appHeader from '../components/header/header.vue';
import appSidebar from '../components/sidebar/sidebar.vue';
import Auth from '../services/auth';

class App {
  constructor() {
    this.auth = new Auth({
      login: '/login',
    });

    this.components = {
      flot,
      appHeader,
      appSidebar,
    };
  }
}

const app = new App;

export default app;

// $(document).ready(function() {
//     var data = [{
//         data: [
//             [1, 4],
//             [2, 5],
//             [3, 7],
//             [4, 4],
//             [5, 8],
//             [6, 9],
//             [7, 11],
//             [8, 10],
//             [9, 8],
//             [10, 5],
//             [11, 4],
//             [12, 3]
//         ]
//     }];
//
//     var chartUsersOptions2 = {
//         series: {
//             splines: {
//                 show: true,
//                 tension: 0.4,
//                 lineWidth: 2,
//                 fill: false
//             },
//         },
//         legend: {
//             show: false
//         },
//         grid: {
//             borderWidth: 0
//         }
//     };
//
//     $.plot($("#flotProfile"), data, chartUsersOptions2);
//
// });
//
</script>
