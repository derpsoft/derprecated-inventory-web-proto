<template>
  <main class="main">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">Home</li>
      <li class="breadcrumb-item"><a href="#">Admin</a>
      </li>
      <li class="breadcrumb-item active">Dashboard</li>
    </ol>

  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-secondary btn-return" :to="{path: '/users'}">Back to Users</router-link>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-plus"></i>
          </div>
          <div class="header-title">
            <h3>{{ isAdd ? 'Add' : 'Edit' }} User</h3>
            <small>Modify User</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <user-add v-if="isAdd"></user-add>
        <user-edit v-else></user-edit>
      </div>
    </div>
  </div>
</main>
</template>

<script>
import userAdd from './add';
import userEdit from './edit';

export default {
  name: 'modifyUserView',
  data() {
    return {};
  },
  computed: {
    isAdd() {
      return this.$route && ~this.$route.path.indexOf('add');
    },
  },
  components: {
    userAdd,
    userEdit,
  },
};
</script>
