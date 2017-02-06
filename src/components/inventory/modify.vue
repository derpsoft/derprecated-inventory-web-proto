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
            <router-link class="btn btn-w-md btn-accent btn-return" :to="{path: '/inventory'}">Back to Inventory</router-link>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-plus"></i>
          </div>
          <div class="header-title">
            <h3>Manage Inventory</h3>
            <small></small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <receive-inventory v-if="isReceive"></receive-inventory>
        <dispatch-inventory v-if="isDispatch"></dispatch-inventory>
        <import-inventory v-if="isImport"></import-inventory>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import ReceiveInventory from './receiveInventory';
import DispatchInventory from './dispatchInventory';
import ImportInventory from './import';

export default {
  data() {
    return {};
  },
  computed: {
    isReceive() {
      return this.$route && ~this.$route.path.indexOf('receive');
    },
    isDispatch() {
      return this.$route && ~this.$route.path.indexOf('dispatch');
    },
    isImport() {
      return this.$route && ~this.$route.path.indexOf('import');
    },
  },
  components: {
    ReceiveInventory,
    DispatchInventory,
    ImportInventory,
  },
};
</script>
