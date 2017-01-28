<template>
<div class="container-center">
  <div class="view-header">
    <div class="header-icon">
      <i class="pe page-header-icon pe-7s-id"></i>
    </div>
    <div class="header-title">
      <h2>Reset password</h2>
      <small>
        Please enter your new password.
      </small>
    </div>
  </div>
  <div class="panel panel-filled">
    <div class="panel-body">
      <form id="reset-password-form" @submit.prevent="validate">
        <div class="form-group" :class="{'has-error': errors.has('password')}">
          <label class="control-label" for="password">New Password</label>
          <input type="password" placeholder="Password" title="Please enter your new password" required name="password" id="password" class="form-control" tabindex="0" autocomplete="off" v-model="password">
          <span v-show="errors.has('password')" class="help-block">{{ errors.first('password') }}</span>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('password-repeat')}">
          <label class="control-label" for="email">Repeat New Password</label>
          <input type="password" placeholder="Repeat" title="Please re-enter your new password" required name="password-repeat" id="password-repeat" class="form-control" tabindex="0" autocomplete="off" v-model="passwordRepeat" v-validate="'required|confirmed:password'">
            <span v-show="errors.has('password-repeat')" class="help-block">{{ errors.first('password-repeat') }}</span>
        </div>
        <div>
          <button class="btn btn-accent" type="submit">Save password</button>
          <router-link class="btn btn-default" :to="{ path: '/login' }">Cancel</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Constants from '../../constants';

export default {
  name: 'resetPasswordView',
  data() {
    return {
      password: '',
      passwordRepeat: '',
    };
  },
  computed: {
    email() {
      return this.$route.params.email;
    },
    token() {
      return this.$route.params.token;
    }
  },
  watch: {
    $route: 'load'
  },
  methods: {
    redirect() {
      this.$router.push({
        path: '/login'
      });
    },
    validate() {
      this.$validator.validateAll().then((success) => {
        if (!success) {
          return;
        }
        this.resetPassword();
      });
    },
    resetPassword() {
      const redirect = this.redirect;
      this.$store.dispatch(Constants.RESET_PASSWORD, {
        email: this.email,
        password: this.password,
        passwordRepeat: this.passwordRepeat,
        token: this.token,
        redirect,
      });
    },
  },
};
</script>
