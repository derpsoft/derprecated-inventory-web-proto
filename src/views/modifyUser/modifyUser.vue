<template>
  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <div class="view-header">
            <div class="pull-right">
              <button class="btn btn-w-md btn-accent btn-return" v-link="{path: '/users'}">Back to Users</button>
            </div>
            <div class="header-icon">
              <i class="pe page-header-icon pe-7s-plus"></i>
            </div>
            <div class="header-title">
              <h3>{{ isEdit ? 'Edit' : 'Add' }} User</h3>
              <small>{{ isEdit ? 'Modify User' : 'Create a user' }}</small>
            </div>
          </div>
            <hr>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <user-edit></user-edit>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import userEdit from '../../components/userEdit/userEdit.vue';

export default {
  data () {
    return {
      isEdit: true,
    };
  },
  computed: {},
  methods: {},
  components: {
    userEdit,
  },
};
</script>
