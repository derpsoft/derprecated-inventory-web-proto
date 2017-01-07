<template>
<form id="login-form" @submit.prevent="validate">
  <div class="form-group" :class="{'has-error': errors.has('username')}">
    <label class="control-label" for="username">Username</label>
    <input v-model="username" type="text" placeholder="Email" title="User Name" name="username" id="username" class="form-control" v-validate.initial="username" data-vv-rules="required|email" >
    <span class="help-block small" v-show="!errors.has('username')">Your unique username to app</span>
    <span v-show="errors.has('username')" class="help-block">{{ errors.first('username') }}</span>
  </div>
  <div class="form-group" :class="{'has-error': errors.has('password')}">
    <label class="control-label" for="password">Password</label>
    <input v-model="password" type="password" title="Please enter your password" placeholder="Password" name="password" id="password" class="form-control" v-validate.initial="password" data-vv-rules="required">
    <span class="help-block small" v-show="!errors.has('password')">Your strong password</span>
    <span v-show="errors.has('password')" class="help-block">{{ errors.first('password') }}</span>
  </div>
  <div>
    <button type="submit" class="btn btn-accent">Login</button>
    <div class="pull-right">
      <router-link class="btn btn-link" :to="{path: '/register'}">Register</router-link>
      <router-link class="btn btn-link" :to="{path: '/forgot-password'}">Forgot Password?</router-link>
    </div>
  </div>
</form>
</template>

<style lang="less" scoped>
.alert {
    margin-top: 10px;
}
</style>

<script>
import Constants from '../../constants';

export default {
  name: 'loginForm',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    validate() {
      this.$validator.validateAll().then((success) => {
        if (!success) {
          return;
        }
        this.login();
      });
    },
    login() {
      this.$store.dispatch(Constants.LOGIN, {
        username: this.username,
        password: this.password
      });
    },
  },
};
</script>
