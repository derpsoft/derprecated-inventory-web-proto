<style lang="css">
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
<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <form id="user-edit-form" @submit.prevent="validate">
          <div class="card">
            <div class="card-header">
              Edit User: {{value.firstName}} {{value.lastName}}
              <div class="card-actions">
                <router-link class="btn btn-secondary btn-return" :to="{path: '/users'}">Back to Users</router-link>
                <button class="btn btn-primary pull-right" type="submit">Save User</button>
              </div>
            </div>
            <div class="card-block">
              <div class="form-group" :class="{'has-danger': errors.has('email')}">
                <label class="form-control-label">Email</label>
                <input type="email" name="email" class="form-control" placeholder="Email" v-model="value.email" disabled v-validate="'required|email'" :class="{'form-control-danger': errors.has('email') }">
                <span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>
              </div>
              <div class="form-group" :class="{'has-danger': errors.has('username')}">
                <label class="form-control-label">Username</label>
                <input type="text" class="form-control" placeholder="Username" name="username" v-model="value.userName" v-validate="'required'" :class="{'form-control-danger': errors.has('username') }">
                <span v-show="errors.has('username')" class="form-control-feedback">{{ errors.first('username') }}</span>
              </div>
              <div class="form-group" :class="{'has-danger': errors.has('phone')}">
                <label class="form-control-label">Phone Number</label>
                <input type="tel" class="form-control" placeholder="Phone Number" v-model="value.phoneNumber" name="phone" v-validate="'required'" :class="{'form-control-danger': errors.has('phone') }">
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
import Constants from 'src/constants';

export default {
  data() {
    return {
      value: {},
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    user() {
      return this.$store.getters.user(this.id);
    },
  },
  watch: {
    $route: 'load',
    user: 'refresh',
  },
  methods: {
    validate() {
      this.$validator
        .validateAll()
        .then((isValid) => {
          if (isValid) {
            this.save();
          }
        });
    },
    save() {
      const user = JSON.parse(JSON.stringify(this.value));

      user.id = this.id;
      this.$store.dispatch(Constants.UPDATE_USER, {
        user
      });
    },
    refresh() {
      this.value = Object.assign({}, this.user);
    },
    load() {
      this.$store.dispatch(Constants.GET_USER, {
        id: this.id,
      });
    },
  },
  mounted() {
    this.load();
  }
};
</script>
