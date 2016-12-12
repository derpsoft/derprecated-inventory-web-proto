<template>
  <div class="row control-row">
    <div class="col-md-12">
      <button class="btn btn-primary pull-right" @click="save()">Save</button>
      <h4>User Details</h4>
    </div>
  </div>
  <div class="panel panel-filled">
    <div class="panel-body">
      <div v-if="user">
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" placeholder="Email" tabindex="0" v-model="user.email" readonly>
        </div>
        <div class="form-group">
          <label>First Name</label>
          <input type="text" class="form-control" placeholder="First Name" tabindex="0" v-model="user.firstName">
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input type="text" class="form-control" placeholder="Last Name" tabindex="0" v-model="user.lastName">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Constants from '../../constants';
import store from '../../stores/store';

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
  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    }
  },
  watch: {
    $route: 'load'
  },
  created() {
    this.$store.watch(() => store.getters.users.user, (current) => {
      this.user = Object.assign({}, this.user, current);
    });
    this.load();
  },
  methods: {
    load() {
      this.$store.dispatch(Constants.GET_USER, {
        id: this.id,
      });
    },
    save() {
      this.$store.dispatch(Constants.SAVE_USER, {
        id: this.id,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
      });
    }
  },
};
</script>
