<template>
<div>
  <form id="user-add-form" @submit.prevent="validate">
    <div class="row control-row">
      <div class="col-md-12">
        <button class="btn btn-primary pull-right" type="submit">Create User</button>
        <h4>User Details</h4>
      </div>
    </div>
    <div class="panel panel-filled panel-main">
      <div class="panel-body">
        <div class="form-group" :class="{'has-error': errors.has('email')}">
          <label>Email</label>
          <input type="email" name="email" class="form-control" placeholder="Email" v-model="user.email" v-validate="'required|email'" v-focus="true">
          <span v-show="errors.has('email')" class="help-block">{{ errors.first('email') }}</span>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('username')}">
          <label>Username</label>
          <input type="text" class="form-control" placeholder="Username" name="username" v-model="user.userName" v-validate="'required'">
          <span v-show="errors.has('username')" class="help-block">{{ errors.first('username') }}</span>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('firstName')}">
          <label>First Name</label>
          <input type="text" class="form-control" placeholder="First Name" name="firstName" v-model="user.firstName" v-validate="'required'">
          <span v-show="errors.has('firstName')" class="help-block">{{ errors.first('firstName') }}</span>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('lastName')}">
          <label>Last Name</label>
          <input type="text" class="form-control" placeholder="Last Name" v-model="user.lastName" name="lastName" v-validate="'required'">
          <span v-show="errors.has('lastName')" class="help-block">{{ errors.first('lastName') }}</span>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('phone')}">
          <label>Phone Number</label>
          <input type="tel" class="form-control" placeholder="Phone Number" v-model="user.phoneNumber" name="phone" v-validate="'required'">
          <span v-show="errors.has('phone')" class="help-block">{{ errors.first('phone') }}</span>
        </div>
        <div>
          <h4>Permissions</h4>
          <div class="col-md-3 col-xs-12" v-for="p in allPermissions">
            <div class="checkbox">
              <label>
                <input type="checkbox" v-bind:id="permission" v-bind:value="permission.key" v-model="permissions">
                {{ permission.description }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
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
