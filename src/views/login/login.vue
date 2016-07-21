<template>
  <section class="content" id="login">
          <div class="back-link">
              <a href="index.html" class="btn btn-accent">Back to Dashboard</a>
          </div>
          <div class="container-center animated slideInDown">
              <div class="view-header">
                  <div class="header-icon">
                      <i class="pe page-header-icon pe-7s-unlock"></i>
                  </div>
                  <div class="header-title">
                      <h3>Login</h3>
                      <small>
                          Please enter your credentials to login.
                      </small>
                  </div>
              </div>
              <div class="panel panel-filled">
                  <div class="panel-body">
                      <form action="index.html" id="loginForm" novalidate>
                          <div class="form-group">
                              <label class="control-label" for="username">Username</label>
                              <input v-model="username" type="text" placeholder="example@gmail.com" title="Please enter you username" required="" value="" name="username" id="username" class="form-control">
                              <span class="help-block small">Your unique username to app</span>
                          </div>
                          <div class="form-group">
                              <label class="control-label" for="password">Password</label>
                              <input v-model="password" type="password" title="Please enter your password" placeholder="******" required="" value="" name="password" id="password" class="form-control">
                              <span class="help-block small">Your strong password</span>
                          </div>
                          <div>
                              <button class="btn btn-accent" @click="login($event)">Login</button>
                              <a class="btn btn-default" href="register.html">Register</a>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </section>
</template>

<script>
import Vue from 'vue';
import $ from 'jquery';
import Auth from '../../services/auth';

$(() => {
  const vm = new Vue({
    el: '#loginForm',
    data: {
      username: '',
      password: '',
    },
    methods: {
      login: (evt) => {
        evt.preventDefault();

        // console.log(this);
        return new Auth()
          .tryLogin(this.data.username, this.data.password);
      },
    },
  });

  return vm;
});

</script>
