<style lang="css" scoped>
.alert {
    margin-top: 10px;

    &.alert-info {
      margin-bottom: 10px;
    }
}
</style>

<template>

  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card mx-2">
            <div class="card-block p-2">
              <h1>Forgot Password</h1>
              <p class="text-muted">Please provide your email to reset your password</p>

              <div class="alert alert-info" v-if="resetRequested">
                You will receive an email shortly with your password reset.
              </div>

              <form id="forgot-password" @submit.prevent="validate">
                <div :class="{'has-danger': errors.has('password')}">
                  <div class="input-group mb-1">
                    <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                    <input type="email" placeholder="example@email.com" title="Please enter you username" name="email" id="email" class="form-control" tabindex="0" autocomplete="off" v-model="email" v-validate="'required|email'" :class="{'form-control-danger': errors.has('email') }">
                  </div>
                  <div v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</div>
                </div>

                <button type="submit" class="btn btn-block btn-success">Forgot Password</button>
                <router-link class="btn btn-link btn-block" :to="{ path: '/login' }">Cancel</router-link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Constants from 'src/constants';

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
