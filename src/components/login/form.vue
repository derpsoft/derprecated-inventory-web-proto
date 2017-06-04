<style lang="css">
#login-container {
  .auth0-lock {
    width: 100%;
    .auth0-lock-header {
      display: none;
    }
    .auth0-lock-widget {
      width: 100%;
    }
  }
  .auth0-lock-content {
    padding: 0;
  }
  .auth0-lock.auth0-lock .auth0-lock-cred-pane {
    background: transparent;
  }
  .auth0-lock-social-button {
    &+.auth0-lock-social-button {
      margin-top: 1.3em;
      opacity: 0.9;
    }
  }
}
</style>

<template>
<div id="login-container">
</div>
</template>

<script>
// @flow
import Constants from 'src/constants';

export default {
  name: 'loginForm',

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },

  watch: {
    isAuthenticated: 'refresh'
  },

  mounted() {
    this.refresh();
  },

  methods: {
    refresh() {
      if (!this.isAuthenticated) {
        this.$store.dispatch(Constants.LOGIN);
      } else {
        this.$router.go('/');
      }
    },
  },
};
</script>
