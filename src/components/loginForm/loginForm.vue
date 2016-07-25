<template>
  <form action="index.html" id="loginForm" novalidate>
    <div class="form-group">
      <label class="control-label" for="username">Username</label>
      <input v-model="username" type="text" placeholder="Email" title="User Name" value="" name="username" id="username" class="form-control">
      <span class="help-block small">Your unique username to app</span>
    </div>
    <div class="form-group">
      <label class="control-label" for="password">Password</label>
      <input v-model="password" type="password" title="Please enter your password" placeholder="Password" value="" name="password"
        id="password" class="form-control">
      <span class="help-block small">Your strong password</span>
    </div>
    <div>
      <button type="button" class="btn btn-accent" @click="login()">Login</button>
      <a class="btn btn-default" href="#" v-link="{path: 'register'}">Register</a>
    </div>
  </form>
</template>

<script>
import Vue from 'vue';
import Auth from '../../services/auth';

const loginForm = Vue.extend({
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      return new Auth()
        .tryLogin(this.username, this.password);
    },
  },
});
export default Vue.component('login-form', loginForm);
</script>
