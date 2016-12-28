<template>
<div>
  <div class="row control-row">
    <div class="col-md-12">
      <button class="btn btn-primary pull-right" @click="save">Save</button>
      <h4>User Details</h4>
    </div>
  </div>
  <div class="panel panel-filled panel-main">
    <div class="panel-body">
      <form>
        <div class="media">
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" placeholder="Email" v-model="user.email" disabled>
          </div>
          <div class="form-group">
            <label>First Name</label>
            <input type="text" class="form-control" placeholder="First Name" v-model="user.firstName">
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input type="text" class="form-control" placeholder="Last Name" v-model="user.lastName">
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input type="tel" class="form-control" placeholder="Phone Number" v-model="user.phoneNumber">
          </div>
          <div>
            <h4>Permissions</h4>
            <template v-for="p in allPermissions">
              <div class="checkbox">
                <label>
                  <input type="checkbox" v-model="user.permissions" :value="p">
                  {{ p }}
                </label>
              </div>
            </template>
          </div>
        </div>
      </form>
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
        permissions: [],
      },
    };
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    },
    allPermissions() {
      return Constants.permissions.sort();
    }
  },
  watch: {
    $route: 'load'
  },
  methods: {
    save() {
      const user = JSON.parse(JSON.stringify(this.user));

      user.id = this.id;
      store.dispatch(Constants.SAVE_USER, {
        user
      });
    },
    load() {
      store.dispatch(Constants.GET_USER, {
        id: this.id,
      });
    }
  },
  mounted() {
    store.watch(() => store.getters.user, (current) => {
      this.user = Object.assign({}, current);
    });
    this.load();
  }
};
</script>
