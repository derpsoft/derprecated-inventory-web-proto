<template>
<div>
  <form id="user-edit-form" @submit.prevent="validate">
    <div class="row control-row">
      <div class="col-md-12">
        <button class="btn btn-primary pull-right" type="submit">Save User</button>
        <h4>User Details</h4>
      </div>
    </div>
    <div class="panel panel-filled panel-main">
      <div class="panel-body">
        <div class="form-group" :class="{'has-error': errors.has('email')}">
          <label>Email</label>
          <input type="email" name="email" class="form-control" placeholder="Email" v-model="user.email" disabled v-validate.initial="user.email" data-vv-rules="required|email">
          <span v-show="errors.has('email')" class="help-block">{{ errors.first('email') }}</span>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('username')}">
          <label>Username</label>
          <input type="text" class="form-control" placeholder="Username" name="username" v-model="user.userName" v-validate.initial="user.userName" data-vv-rules="required">
          <span v-show="errors.has('username')" class="help-block">{{ errors.first('username') }}</span>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('firstName')}">
          <label>First Name</label>
          <input type="text" class="form-control" placeholder="First Name" name="firstName" v-model="user.firstName" v-validate.initial="user.firstName" data-vv-rules="required">
          <span v-show="errors.has('firstName')" class="help-block">{{ errors.first('firstName') }}</span>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('lastName')}">
          <label>Last Name</label>
          <input type="text" class="form-control" placeholder="Last Name" v-model="user.lastName" name="lastName" v-validate.initial="user.lastName" data-vv-rules="required">
          <span v-show="errors.has('lastName')" class="help-block">{{ errors.first('lastName') }}</span>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('phone')}">
          <label>Phone Number</label>
          <input type="tel" class="form-control" placeholder="Phone Number" v-model="user.phoneNumber" name="phone" v-validate.initial="user.phoneNumber" data-vv-rules="required">
          <span v-show="errors.has('phone')" class="help-block">{{ errors.first('phone') }}</span>
        </div>
        <div class="form-group clearfix">
          <h4>Permissions</h4>
          <div class="col-md-3 col-xs-12" v-for="p in allPermissions">
            <div class="checkbox">
              <label>
                  <input type="checkbox" v-model="user.permissions" :value="p.key">
                  {{ p.description }}
                </label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="password-reset">
            <a class="btn btn-danger pull-left reset-btn" @click="resetPassword">Reset Password</a>
            <span v-if="resetRequested">Password was sent to the user.</span>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>
</template>

<style lang="less">
  .password-reset {
    .reset-btn {
      margin-right: 10px;
    }
    span {
      display: block;
      padding: 6px 0;
      line-height: 1.42857143;
      color: #1bbf89;
    }
  }
</style>

<script>
import _ from 'lodash';
import Constants from '../../constants';

export default {
  data() {
    return {
      user: {
        permissions: [],
      },
    };
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    },
    allPermissions() {
      return _.values(Constants.permissions);
    },
    resetRequested() {
      return this.$store.getters.isResetPasswordSuccess;
    }
  },
  watch: {
    $route: 'load'
  },
  methods: {
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

      user.id = this.id;
      this.$store.dispatch(Constants.SAVE_USER, {
        user
      });
    },
    load() {
      this.$store.dispatch(Constants.GET_USER, {
        id: this.id,
      });
    },
    resetPassword() {
      if (this.user.email) {
        this.$store.dispatch(Constants.FORGOT_PASSWORD, {
          email: this.user.email,
        });
      } else {
        this.$store.dispatch(Constants.SHOW_TOASTR, {
          type: 'info',
          message: 'User does not have an email.'
        });
      }
    }
  },
  mounted() {
    this.$store.watch(() => this.$store.getters.user, (current) => {
      this.user = Object.assign({}, current);
    });
    this.load();
  }
};
</script>
