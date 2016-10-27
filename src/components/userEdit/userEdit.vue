<template>
<div class="panel panel-filled">
  <div class="panel-body">
    <div v-if="user">
      <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control" placeholder="Email" tabindex="0" v-model="user.email" readonly>
      </div>
      <div class="form-group">
        <label>First Name</label>
        <input type="text" class="form-control" placeholder="First Name" tabindex="0" v-model="user.firstName" v-on:change="update('firstName')">
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input type="text" class="form-control" placeholder="Last Name" tabindex="0" v-model="user.lastName" v-on:change="update('lastName')">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import _ from 'lodash';
import Constants from '../../constants';

export default {
  data() {
    return {
      user: {
        firstName: null,
        lastName: null,
        email: null,
      },
      users: {}
    };
  },
  ready() {
    if (!this.$route.params || !this.$route.params.id || !this.$store.state.users.list.length > 0) {
      return;
    }

    // TODO: add endpoint for profiles
    const user = _.find(this.$store.state.users.list, {
      id: parseInt(this.$route.params.id, 10)
    });

    if (user) {
      this.user.firstName = user.firstName;
      this.user.lastName = user.lastName;
      this.user.email = user.email;
    }
  },
  methods: {
    update(fieldName) {
      switch (fieldName) {
        case 'firstName':
          this.updateFirstName();
          break;
        case 'lastName':
          this.updateLastName();
          break;
        default:
          break;
      }
    },
    updateFirstName() {
      this.$store.dispatch(Constants.UPDATE_USER_FIRST_NAME, {
        id: parseInt(this.$route.params.id, 10),
        firstName: this.user.firstName,
      });
    },
    updateLastName() {
      this.$store.dispatch(Constants.UPDATE_USER_LAST_NAME, {
        id: parseInt(this.$route.params.id, 10),
        lastName: this.user.lastName,
      });
    },

  },
};
</script>
