<template>
<div class="container-center animated slideInDown">
  <div class="view-header">
    <div class="header-icon">
      <i class="pe page-header-icon pe-7s-id"></i>
    </div>
    <div class="header-title">
      <h2>Reset password</h2>
      <small>
        Please enter your email to rest your password.
      </small>
    </div>
  </div>
  <div class="panel panel-filled">
    <div class="panel-body" v-if="resetRequested">
      <div class="alert alert-info">
        You will retrieve an email shortly with your password reset.
      </div>
    </div>
    <div class="panel-body" v-if="!resetRequested">
      <div class="alert alert-danger" v-if="emailError">
        Please enter an email address.
      </div>
      <form id="loginForm">
        <div class="form-group">
          <label class="control-label" for="email">Email address</label>
          <input type="email" placeholder="example@email.com" title="Please enter you username" required value="" name="email" id="email" class="form-control" tabindex="0" autocomplete="off" v-model="email">
          <span class="help-block small">Your address email to retrieve new password.</span>
        </div>
        <div>
          <button class="btn btn-accent" type="submit" v-on:click.prevent="retrievePassword">Send new password</button>
          <router-link class="btn btn-default" :to="{ path: '/login' }">Cancel</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.alert {
    margin-top: 10px;

    &.alert-info {
      margin-bottom: 10px;
    }
}
</style>
<script>
import Constants from '../../constants';

export default {
  name: 'forgotPasswordView',
  data() {
    return {
      email: null,
      emailError: false,
    };
  },
  computed: {
    resetRequested() {
      return this.$store.getters.isResetPasswordSuccess;
    }
  },
  methods: {
    retrievePassword() {
      if (!this.email) {
        this.emailError = true;
        return;
      }

      this.$store.dispatch(Constants.FORGOT_PASSWORD, {
        email: this.email,
      });
    },
  },
  mounted() {
    this.$store.dispatch(Constants.RESET_RESET_PASSWORD_FLAG, false);
  }
};
</script>
