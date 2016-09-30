<template>
<form action="index.html" id="loginForm" novalidate>
  <div class="form-group">
    <label class="control-label" for="username">Username</label>
    <input v-model="username" type="text" placeholder="Email" title="User Name" value="" name="username" id="username" class="form-control">
    <span class="help-block small">Your unique username to app</span>
  </div>
  <div class="form-group">
    <label class="control-label" for="password">Password</label>
    <input v-model="password" type="password" title="Please enter your password" placeholder="Password" value="" name="password" id="password" class="form-control">
    <span class="help-block small">Your strong password</span>
  </div>
  <div>
    <button type="submit" class="btn btn-accent" @click.stop.prevent="login()">Login</button>
    <div class="pull-right">
      <a class="btn btn-link" href="#" v-link="{path: '/register'}">Register</a>
      <a class="btn btn-link" href="#" v-link="{path: '/forgot-password'}">Forgot Password?</a>
    </div>
  </div>
</form>
</template>

<script>
import Vue from 'vue';
// import Auth from '../../services/auth';
import Constants from '../../constants';

const loginForm = Vue.extend({
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    login() {
      this.$store.dispatch(Constants.LOGIN, {
        username: this.username,
        password: this.password
      });

      // return new Auth()
      //   .login(this.username, this.password)
      //   .then(user => {
      //     if (user.isAuthenticated) {
      //       this.$router.go('/');
      //     } else {
      //       // show error messaging?
      //     }
      //   });
    },
  },
});
export default Vue.component('login-form', loginForm);
</script>
