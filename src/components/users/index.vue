<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-w-md btn-accent" :to="{path: '/users/add'}">Add New User</router-link>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-users"></i>
          </div>
          <div class="header-title">
            <h3>Users</h3>
            <small>Find all contacts</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <user-list></user-list>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import UserList from './list.vue';

export default {
  name: 'usersView',
  data() {
    return {};
  },
  components: {
    UserList,
  },
};
</script>
