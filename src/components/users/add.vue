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
            <label>First Name</label>
            <input type="text" class="form-control" placeholder="First Name" v-model="user.firstName">
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input type="text" class="form-control" placeholder="Last Name" v-model="user.lastName">
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
      user: {},
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
  methods: {
    save() {
      const user = JSON.parse(JSON.stringify(this.user));
      user.id = this.id;
      store.dispatch(Constants.SAVE_USER, {
        user
      });
    }
  },
};
</script>
