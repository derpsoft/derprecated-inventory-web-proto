<style scoped>
.profile-link {
  .btn {
    outline: none;
    &:active,
    &:focus {
      color: #000;
    }
  }
}

</style>

<template>
<nav class="navbar navbar-default navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <router-link class="navbar-brand" href="#" :to="{ path: '/' }">
        DERP
        <span>v{{appVersion}}</span>
      </router-link>
    </div>
    <div id="navbar" class="navbar-collapse collapse">
      <ul class="nav navbar-nav navbar-right">
        <li class="profil-link">
          <button type="button" class="btn btn-link" slot="button">
              <span class="profile-address">{{ user.displayName }}</span>
              <img :src="user.picture" class="img-circle" :alt="user.displayName">
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
};

</script>
