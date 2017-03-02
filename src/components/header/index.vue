<style lang="css" scoped>
.profil-link {
    .btn {
        &:active,
        &:focus {
            color: #000;
        }
        outline: none;
    }
}
</style>

<template>
<nav class="navbar navbar-default navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <!-- <div id="mobile-menu">
          <div class="left-nav-toggle">
            <dropdown>
              <a slot="button" class="btn btn-link btn-xs">
                <i class="stroke-hamburgermenu"></i>
              </a>
              <ul slot="dropdown-menu" class="dropdown-menu">
                <li>
                  <router-link href="#dropdown" :to="{ path: 'profile' }" title="Profile">
                    Profile
                  </router-link>
                <li>
              </ul>
            </dropdown>
          </div>
        </div> -->
      <router-link class="navbar-brand" href="#" :to="{ path: '/' }">
        DERP
        <span>v{{appVersion}}</span>
      </router-link>
    </div>
    <div id="navbar" class="navbar-collapse collapse">
      <!-- <div class="left-nav-toggle">
          <a href="">
            <i class="stroke-hamburgermenu"></i>
          </a>
        </div> -->
      <!-- <form class="navbar-form navbar-left">
          <input type="text" class="form-control" placeholder="Search data for analysis" style="width: 175px">
        </form> -->
      <ul class="nav navbar-nav navbar-right">
        <!-- <li class="dropdown">
            <a href="versions.html" >Versions
              <span class="label label-warning pull-right">1</span>
            </a>
          </li> -->
        <li class="profil-link">
          <button type="button" class="btn btn-link" slot="button">
                <span class="profile-address">{{ userSession.userName }}</span>
                <img src="/static/img/avatar.png" class="img-circle" alt="">
              </button>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import {
  version
} from '../../../package.json';

export default {
  name: 'header',
  data() {
    return {
      appVersion: version,
    };
  },
  components: {
  },
  computed: {
    userSession() {
      return this.$store.getters.profile;
    }
  },
};
</script>
