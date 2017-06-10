<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <form id="user-add-form" @submit.prevent="validate">
          <div class="card">
            <div class="card-header">
              Add User
              <div class="card-actions">
                <router-link class="btn btn-secondary btn-return" :to="{path: '/users'}">Back to Users</router-link>
                <button class="btn btn-primary pull-right" type="submit">Create User</button>
              </div>
            </div>
            <div class="card-block">
              <div class="form-group" :class="{'has-danger': errors.has('email')}">
                <label class="form-control-label">Email</label>
                <input type="email" name="email" class="form-control" placeholder="Email" v-model="user.email" v-validate="'required|email'" :class="{'form-control-danger': errors.has('email') }">
                <span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>
              </div>
              <div class="form-group" :class="{'has-danger': errors.has('username')}">
                <label class="form-control-label">Username</label>
                <input type="text" class="form-control" placeholder="Username" name="username" v-model="user.userName" v-validate="'required'" :class="{'form-control-danger': errors.has('username') }">
                <span v-show="errors.has('username')" class="form-control-feedback">{{ errors.first('username') }}</span>
              </div>
              <div class="form-group" :class="{'has-danger': errors.has('firstName')}">
                <label class="form-control-label">First Name</label>
                <input type="text" class="form-control" placeholder="First Name" name="firstName" v-model="user.firstName" v-validate="'required'" :class="{'form-control-danger': errors.has('firstName') }">
                <span v-show="errors.has('firstName')" class="form-control-feedback">{{ errors.first('firstName') }}</span>
              </div>
              <div class="form-group" :class="{'has-danger': errors.has('lastName')}">
                <label class="form-control-label">Last Name</label>
                <input type="text" class="form-control" placeholder="Last Name" v-model="user.lastName" name="lastName" v-validate="'required'" :class="{'form-control-danger': errors.has('lastName') }">
                <span v-show="errors.has('lastName')" class="form-control-feedback">{{ errors.first('lastName') }}</span>
              </div>
              <div class="form-group" :class="{'has-danger': errors.has('phone')}">
                <label class="form-control-label">Phone Number</label>
                <input type="tel" class="form-control" placeholder="Phone Number" v-model="user.phoneNumber" name="phone" v-validate="'required'" :class="{'form-control-danger': errors.has('phone') }">
                <span v-show="errors.has('phone')" class="form-control-feedback">{{ errors.first('phone') }}</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import Constants from 'src/constants';

export default {
  data() {
    return {
      user: {},
      permissions: [],
    };
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    },
    allPermissions() {
      return _.values(Constants.permissions);
    }
  },
  methods: {
    redirect() {
      this.$router.push({
        path: '/users'
      });
    },
    validate() {
      this.$validator.validateAll().then((success) => {
        if (!success) {
          return;
        }
        this.save();
      });
    },
    save() {
      const user = JSON.parse(JSON.stringify(this.user));
      const permissions = JSON.parse(JSON.stringify(this.permissions));
      const redirect = this.redirect;

      this.$store.dispatch(Constants.CREATE_USER, {
        user,
        permissions,
        redirect,
      });
    }
  },
};
</script>
