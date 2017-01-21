<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-w-md btn-accent btn-return" :to="{path: '/warehouses'}">Back to Warehouses</router-link>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-plus"></i>
          </div>
          <div class="header-title">
            <h3>Edit Warehouse</h3>
            <small>Make modifications</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <warehouse-add v-if="isAdd"></warehouse-add>
        <warehouse-edit v-else></warehouse-edit>
      </div>
    </div>
  </div>
</section>
</template>
<script>
import WarehouseAdd from './add.vue';
import WarehouseEdit from './edit.vue';

export default {
  name: 'modifyWarehouseView',
  data() {
    return {};
  },
  computed: {
    isAdd() {
      return this.$route && ~this.$route.path.indexOf('add');
    },
  },
  components: {
    WarehouseAdd,
    WarehouseEdit,
  },
};
</script>

<style scoped>
.btn-return {
  margin-right: -15px;
}
</style>
