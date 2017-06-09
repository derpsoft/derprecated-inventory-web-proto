<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card mx-2">
            <div class="card-block p-2">
              <h1>Reset Password</h1>
              <p class="text-muted">Set your new password</p>

              <form id="reset-password-form" @submit.prevent="validate">
                <div :class="{'has-danger': errors.has('password')}">
                  <div class="input-group mb-1">
                    <span class="input-group-addon"><i class="icon-lock"></i></span>
                    <input type="password" placeholder="Password" title="Please enter your new password" required name="password" id="password" class="form-control" tabindex="0" autocomplete="off" v-model="password" :class="{'form-control-danger': errors.has('password') }">
                  </div>
                  <div v-show="errors.has('password')" class="form-control-feedback">{{ errors.first('password') }}</div>
                </div>

                <div :class="{'has-danger': errors.has('password-repeat')}">
                  <div class="input-group mb-1">
                    <span class="input-group-addon"><i class="icon-lock"></i></span>
                    <input type="text" class="form-control" name="password-repeat" placeholder="Email" :class="{'form-control-danger': errors.has('password-repeat') }">
                  </div>
                  <div v-show="errors.has('password-repeat')" class="form-control-feedback">{{ errors.first('password-repeat') }}</div>
                </div>

                <button type="submit" class="btn btn-block btn-success">Reset Password</button>
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
