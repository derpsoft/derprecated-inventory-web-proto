<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-w-md btn-accent btn-return" :to="{path: '/products'}">Back to Products</router-link>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-plus"></i>
          </div>
          <div class="header-title">
            <h3>{{ isAdd ? 'Add' : 'Edit'}} Product</h3>
            <small>Make modifications</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <product-add v-if="isAdd"></product-add>
        <product-edit v-else></product-edit>
      </div>
    </div>
  </div>
</section>
</template>
<script>
import ProductAdd from './add.vue';
import ProductEdit from './edit.vue';

export default {
  name: 'modifyProductView',
  computed: {
    isAdd() {
      return this.$route && ~this.$route.path.indexOf('add');
    },
  },
  components: {
    ProductAdd,
    ProductEdit,
  },
};
</script>

<style scope>
.btn-return {
  margin-right: -15px;
}
</style>
