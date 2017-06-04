<style scoped>
</style>

<template>
 <header class="app-header navbar">
        <button class="navbar-toggler mobile-sidebar-toggler hidden-lg-up" type="button" @click="mobileSidebarToggle">☰</button>
        <router-link class="navbar-brand" href="#" :to="{ path: '/' }"></router-link>
        <ul class="nav navbar-nav hidden-md-down float-left">
            <li class="nav-item">
                <a class="nav-link navbar-toggler sidebar-toggler" href="#" @click="sidebarToggle">☰</a>
            </li>

        </ul>
        <ul class="nav navbar-nav ml-auto">
            <li class="nav-item dropdown">
                <router-link class="navbar-link avatar" href="#" :to="{ path: '/' }" role="button" aria-haspopup="true" aria-expanded="false">
                    <img :src="user.picture" class="img-avatar" :alt="user.displayName">
                </router-link>
                <div class="dropdown-menu dropdown-menu-right">

                    <div class="dropdown-header text-center">
                        <strong>Account</strong>
                    </div>

                    <a class="dropdown-item" href="#"><i class="fa fa-bell-o"></i> Updates<span class="badge badge-info">42</span></a>
                    <a class="dropdown-item" href="#"><i class="fa fa-envelope-o"></i> Messages<span class="badge badge-success">42</span></a>
                    <a class="dropdown-item" href="#"><i class="fa fa-tasks"></i> Tasks<span class="badge badge-danger">42</span></a>
                    <a class="dropdown-item" href="#"><i class="fa fa-comments"></i> Comments<span class="badge badge-warning">42</span></a>

                    <div class="dropdown-header text-center">
                        <strong>Settings</strong>
                    </div>

                    <a class="dropdown-item" href="#"><i class="fa fa-user"></i> Profile</a>
                    <a class="dropdown-item" href="#"><i class="fa fa-wrench"></i> Settings</a>
                    <a class="dropdown-item" href="#"><i class="fa fa-usd"></i> Payments<span class="badge badge-default">42</span></a>
                    <a class="dropdown-item" href="#"><i class="fa fa-file"></i> Projects<span class="badge badge-primary">42</span></a>
                    <div class="divider"></div>
                    <a class="dropdown-item" href="#"><i class="fa fa-shield"></i> Lock Account</a>
                    <a class="dropdown-item" href="#"><i class="fa fa-lock"></i> Logout</a>
                </div>
            </li>
            <li class="nav-item hidden-md-down">
                <a class="nav-link navbar-toggler aside-menu-toggler" href="#" @click="asideToggle">☰</a>
            </li>
        </ul>
    </header>
</template>

<script>
// @flow
import {
  version
} from 'root/package.json';

export default {
  name: 'header',
  data() {
    return {
      appVersion: version,
    };
  },
  components: {},
  computed: {
    user() {
      return this.$store.getters.profile;
    }
  },
  methods: {
    sidebarToggle (e: any) {
      e.preventDefault();
      if (document.body) {
        document.body.classList.toggle('sidebar-hidden');
      }
    },
    mobileSidebarToggle (e: any) {
      e.preventDefault();
      if (document.body) {
        document.body.classList.toggle('sidebar-mobile-show');
      }
    },
    asideToggle (e: any) {
      e.preventDefault();
      if (document.body) {
        document.body.classList.toggle('aside-menu-hidden');
      }
    }
  }
};
</script>
