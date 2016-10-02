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
        You will retrieve an email shortly with your password reset.
      </div>
      <div class="panel-body" v-if="!resetRequested">
        <form id="loginForm">
          <div class="form-group">
            <label class="control-label" for="email">Email address</label>
            <input type="email" placeholder="example@email.com" title="Please enter you username" required value="" name="email" id="email" class="form-control" tabindex="0" autocomplete="off" v-model="email">
            <span class="help-block small">Your address email to sent new password</span>
          </div>
          <div>
            <button class="btn btn-accent" type="submit" v-on:click="retrievePassword">Send new password</button>
            <a class="btn btn-default" href="#" v-link="{ path: '/login' }">Cancel</a>
          </div>
        </form>
      </div>
  </div>
</template>

<script>
  import toastr from 'toastr';
  import Constants from '../../constants.js';
  export default {
    data() {
      return {
        resetRequested: false,
        email: null,
      };
    },
    methods: {
      retrievePassword(event) {
        event.preventDefault();

        if (!this.email) {
          toastr.info('Please enter an email.');
          return;
        }

        const headers = new Headers();
        headers.set('Content-Type', 'application/json');

        fetch(`${Constants.API_ROOT}password/forgot`, {
          method: 'POST',
          mode: 'cors',
          headers,
          body: JSON.stringify({ email: this.email }),
        })
        .then(res => {
          if (!res.ok) {
            toastr.error('An error has occur please try again later.');
          }
          return res.json();
        })
        .then(resp => {
          if (resp.success) {
            this.resetRequested = true;
          } else if (resp && resp.message) {
            toastr.error(`${resp.message}.  Please try again.`);
          }
        });
      },
    },
  };
</script>
