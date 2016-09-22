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
        <button type="submit" class="btn btn-accent" v-on:click.prevent="register()">Register</button>
        <a class="btn btn-default pull-right" href="#" v-link="{ path: 'login' }">Back to Login</a>
    </div>
</form>
</template>

<script>
  import API_ROOT from '../../constants/constants.js';
  // import Auth from '../../services/auth';

  export default {
    data() {
      return {
        registration: {
          displayName: null,
          username: null,
          password: null,
          repeatPassword: null,
          email: null,
          autoLogin: null,
          continue: null,
        },
      };
    },
    methods: {
      register() {
        if (!(this.registration ||
            this.registration.userName ||
            this.registration.password ||
            this.registration.firstName ||
            this.registration.lastName ||
            this.registration.email)) {
          return;
        }

        const headers = new Headers();
        headers.set('Content-Type', 'application/json');

        fetch(`${API_ROOT}register`, {
          method: 'POST',
          mode: 'no-cors',
          headers,
          body: JSON.stringify(this.registration),
        })
        .then(res => res.json())
        .then(json => {
          console.log(json);
        });
      },
    },
  };
</script>
