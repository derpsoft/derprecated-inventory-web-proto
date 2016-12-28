<template>
<form action="index.html" id="loginForm" novalidate>
  <div v-if="error">ERROR</div>
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
    <button type="submit" class="btn btn-accent" @click.stop.prevent="login">Login</button>
    <div class="pull-right">
      <router-link class="btn btn-link" :to="{path: '/register'}">Register</router-link>
      <router-link class="btn btn-link" :to="{path: '/forgot-password'}">Forgot Password?</router-link>
    </div>
  </div>
</form>
</template>

<script>
// import Toastr from 'toastr';
import Constants from '../../constants';

export default {
  name: 'loginForm',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: {
    error() {
      this.showError();
      return this.$store.getters.loginError;
    }
  },
  methods: {
    login() {
      this.$store.dispatch(Constants.LOGIN, {
        username: this.username,
        password: this.password
      });
    },
    showError() {
      this.$parent.$refs.toast.e('test');
      // Toastr.error('Incorrect user name and/or password.');
      // this.$parent.$parent.$refs.toastr.Add({
      //   msg: 'Incorrect user name and/or password.',
      //   clickClose: true,
      //   timeout: 2000,
      //   position: 'toast-top-full-width',
      //   type: 'error'
      // });
      // this.$parent.$parent.$refs.toastr.e();
    }
  },
};
</script>
