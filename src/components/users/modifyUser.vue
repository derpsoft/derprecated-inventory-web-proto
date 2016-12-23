<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-w-md btn-accent btn-return" :to="{path: '/users'}">Back to Users</router-link>
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
</section>
</template>

<script>
import userAdd from './add.vue';
import userEdit from './edit.vue';

export default {
  name: 'modifyUserView',
  data() {
    return {
      isAdd: true,
    };
  },
  components: {
    userAdd,
    userEdit,
  },
  mounted() {
    if (this.$route && this.$route.path.indexOf('add') > -1) {
      this.isAdd = true;
    } else {
      this.isAdd = false;
    }
  }
};
</script>
