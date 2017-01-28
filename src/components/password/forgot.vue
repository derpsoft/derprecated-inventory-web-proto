<template>
<div class="container-center animated slideInDown">
  <div class="view-header">
    <div class="header-icon">
      <i class="pe page-header-icon pe-7s-id"></i>
    </div>
    <div class="header-title">
      <h2>Reset password</h2>
      <small>
        Please enter your email to reset your password.
      </small>
    </div>
  </div>
  <div class="panel panel-filled">
    <div class="panel-body" v-if="resetRequested">
      <div class="alert alert-info">
        You will receive an email shortly with your password reset.
      </div>
    </div>
    <div class="panel-body" v-if="!resetRequested">
      <form id="forgot-password" @submit.prevent="validate">
        <div class="form-group" :class="{'has-error': errors.has('email')}">
          <label class="control-label" for="email">Email address</label>
          <input type="email" placeholder="example@email.com" title="Please enter you username" name="email" id="email" class="form-control" tabindex="0" autocomplete="off" v-model="email" v-validate="'required|email'">
          <span class="help-block small" v-show="!errors.has('email')">Your address email to retrieve new password.</span>
          <span v-show="errors.has('email')" class="help-block">{{ errors.first('email') }}</span>
        </div>
        <div>
          <button class="btn btn-accent" type="submit">Send new password</button>
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
    validate() {
      this.$validator.validateAll().then((success) => {
        if (!success) {
          return;
        }
        this.retrievePassword();
      });
    },
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
