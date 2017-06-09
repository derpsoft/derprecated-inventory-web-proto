<template>
<form id="registration-form" @submit.prevent="validate">
  <div class="row">
    <div class="form-group col-lg-6" :class="{'has-danger': errors.has('firstName')}">
      <label class="form-control-label">First Name</label>
      <input type="text" id="firstName" class="form-control" name="firstName" placeholder="First Name" tabindex="0" v-model="registration.firstName" v-validate="'required'" :class="{'form-control-danger': errors.has('firstName') }">
      <span class="form-control-feedback small" v-show="!errors.has('firstName')">Your first name</span>
      <span v-show="errors.has('firstName')" class="form-control-feedback">Your first name is required.</span>
    </div>
    <div class="form-group col-lg-6" :class="{'has-danger': errors.has('lastName')}">
      <label class="form-control-label">Last Name</label>
      <input type="text" id="lastName" class="form-control" name="lastName" placeholder="Last Name" tabindex="0" v-model="registration.lastName" v-validate="'required'" :class="{'form-control-danger': errors.has('lastName') }">
      <span class="form-control-feedback small" v-show="!errors.has('lastName')">Your last name</span>
      <span v-show="errors.has('lastName')" class="form-control-feedback">Your last name is required.</span>
    </div>
    <div class="form-group col-lg-6" :class="{'has-danger': errors.has('username')}">
      <label class="form-control-label">Username</label>
      <input type="text" id="username" class="form-control" name="username" placeholder="User Name" tabindex="0" v-model="registration.username" v-validate="'required'" :class="{'form-control-danger': errors.has('username') }">
      <span class="form-control-feedback small" v-show="!errors.has('username')" >Your unique username to app</span>
      <span v-show="errors.has('username')" class="form-control-feedback">Your username is required.</span>
    </div>
    <div class="form-group col-lg-6" :class="{'has-danger': errors.has('email')}">
      <label class="form-control-label">Email Address</label>
      <input type="email" value="" id="email" class="form-control" name="email" placeholder="Email" tabindex="0" v-model="registration.email" v-validate="'required|email'" :class="{'form-control-danger': errors.has('email') }">
      <span class="form-control-feedback small" v-show="!errors.has('email')">Your address email to contact</span>
      <span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>
    </div>
    <div class="form-group col-lg-6" :class="{'has-danger': errors.has('password')}">
      <label class="form-control-label">Password</label>
      <input type="password" id="password" class="form-control" name="password" placeholder="Password" tabindex="0" v-model="registration.password" v-validate="'required'" :class="{'form-control-danger': errors.has('password') }">
      <span class="form-control-feedback small" v-show="!errors.has('password')">Your hard to guess password</span>
      <span v-show="errors.has('password')" class="form-control-feedback">{{ errors.first('password') }}</span>
    </div>
    <div class="form-group col-lg-6" :class="{'has-danger': errors.has('repeatPassword')}">
      <label class="form-control-label">Repeat Password</label>
      <input type="password" id="repeatPassword" class="form-control" name="repeatPassword" placeholder="Repeat Password" tabindex="0" v-model="registration.repeatPassword" v-validate="'required|confirmed:password'" :class="{'form-control-danger': errors.has('repeatPassword') }">
      <span class="form-control-feedback small" v-show="!errors.has('repeatPassword')">Please repeat your password</span>
      <span v-show="errors.has('repeatPassword')" class="form-control-feedback">{{ errors.first('repeatPassword') }}</span>
    </div>
  </div>
  <div>
    <router-link class="btn btn-default" :to="{ path: 'login' }">Back to Login</router-link>
    <button type="submit" class="btn btn-accent pull-right">Register</button>
  </div>
</form>
</template>

<script>
import Constants from 'src/constants';

export default {
  name: 'registrationForm',
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
    validate() {
      this.$validator.validateAll().then((success) => {
        if (!success) {
          return;
        }
        this.register();
      });
    },
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
