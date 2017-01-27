<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-users"></i>
          </div>
          <div class="header-title">
            <h3>Users</h3>
            <small>Find all users</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <user-search></user-search>
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
import UserSearch from './search.vue';

export default {
  components: {
    UserList,
    UserSearch,
  },
};
</script>
