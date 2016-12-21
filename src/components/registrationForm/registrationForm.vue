<template>
<form action="index.html" id="loginForm" novalidate>
  <div class="row">
    <div class="form-group col-lg-6">
      <label>First Name</label>
      <input type="text" value="" id="firstName" class="form-control" name="" placeholder="First Name" tabindex="0" v-model="registration.firstName" required>
      <span class="help-block small">Your unique username to app</span>
    </div>
    <div class="form-group col-lg-6">
      <label>Last Name</label>
      <input type="text" value="" id="lastName" class="form-control" name="" placeholder="Last Name" tabindex="0" v-model="registration.lastName" required>
      <span class="help-block small">Your unique username to app</span>
    </div>
    <div class="form-group col-lg-6">
      <label>Username</label>
      <input type="text" value="" id="username" class="form-control" name="" placeholder="User Name" tabindex="0" v-model="registration.username" required>
      <span class="help-block small">Your unique username to app</span>
    </div>
    <div class="form-group col-lg-6">
      <label>Email Address</label>
      <input type="email" value="" id="email" class="form-control" name="" placeholder="Email" tabindex="0" v-model="registration.email" required>
      <span class="help-block small">Your address email to contact</span>
    </div>
    <div class="form-group col-lg-6">
      <label>Password</label>
      <input type="password" value="" id="password" class="form-control" name="" placeholder="Password" tabindex="0" v-model="registration.password" required>
      <span class="help-block small">Your hard to guess password</span>
    </div>
    <div class="form-group col-lg-6">
      <label>Repeat Password</label>
      <input type="password" value="" id="repeatpassword" class="form-control" name="" placeholder="Repeat Password" tabindex="0" v-model="registration.repeatPassword" required>
      <span class="help-block small">Please repeat your pasword</span>
    </div>
  </div>
  <div>
    <router-link class="btn btn-default" :to="{ path: 'login' }">Back to Login</router-link>
    <button type="submit" class="btn btn-accent pull-right" v-on:click.prevent="register()">Register</button>
  </div>
</form>
</template>

<script>
import Constants from '../../constants';

export default {
  data() {
    return {
      registration: {
        username: null,
        password: null,
        repeatPassword: null,
        firstName: null,
        lastName: null,
        email: null,
      },
    };
  },
  methods: {
    register() {
      this.$store.dispatch(Constants.REGISTER, {
        username: this.registration.username,
        password: this.registration.password,
        email: this.registration.email,
        firstName: this.registration.firstName,
        lastName: this.registration.lastName,
      });
    },
  },
};
</script>
