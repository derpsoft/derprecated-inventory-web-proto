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
<div>
  <form id="user-edit-form" @submit.prevent="validate">
    <div class="row control-row">
      <div class="col-md-12">
        <button class="btn btn-primary pull-right" type="submit">Save User</button>
        <h4>{{value.firstName}} {{value.lastName}}</h4>
      </div>
    </div>
    <div class="panel panel-filled panel-main">
      <div class="panel-body">
        <div class="form-group" :class="{'has-error': errors.has('email')}">
          <label>Email</label>
          <input type="email" name="email" class="form-control" placeholder="Email" v-model="value.email" disabled v-validate="'required|email'">
          <span v-show="errors.has('email')" class="help-block">{{ errors.first('email') }}</span>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('username')}">
          <label>Username</label>
          <input type="text" class="form-control" placeholder="Username" name="username" v-model="value.userName" v-validate="'required'" v-focus="true">
          <span v-show="errors.has('username')" class="help-block">{{ errors.first('username') }}</span>
        </div>
        <div class="form-group" :class="{'has-error': errors.has('phone')}">
          <label>Phone Number</label>
          <input type="tel" class="form-control" placeholder="Phone Number" v-model="value.phoneNumber" name="phone" v-validate="'required'">
          <span v-show="errors.has('phone')" class="help-block">{{ errors.first('phone') }}</span>
        </div>
      </div>
    </div>
  </form>
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
