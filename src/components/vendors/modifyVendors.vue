<style scoped>
.btn-return {
  margin-right: -15px;
}
</style>

<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-w-md btn-accent btn-return" :to="{path: '/vendors'}">Back to Vendors</router-link>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-plus"></i>
          </div>
          <div class="header-title">
            <h3>{{ isAdd ? 'Add' : 'Edit' }} Vendor</h3>
            <small>Create a vendor</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <vendor-add v-if="isAdd"></vendor-add>
        <vendor-edit v-else></vendor-edit>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import VendorAdd from './add';
import VendorEdit from './edit';

export default {
  data() {
    return {};
  },
  computed: {
    isAdd() {
      return this.$route && ~this.$route.path.indexOf('add');
    },
  },
  components: {
    VendorAdd,
    VendorEdit,
  },
};
</script>
