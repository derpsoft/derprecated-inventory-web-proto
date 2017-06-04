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
            <router-link class="btn btn-secondary btn-return" :to="{path: '/products'}">Back to Products</router-link>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-plus"></i>
          </div>
          <div class="header-title">
            <h3 v-if="isAdd">Add Product</h3>
            <h3 v-if="isEdit">Edit Product</h3>
            <h3 v-if="isImport">Import Products</h3>
            <small>Make modifications</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <product-add v-if="isAdd"></product-add>
        <product-edit v-if="isEdit"></product-edit>
        <product-import v-if="isImport"></product-import>
      </div>
    </div>
  </div>
</section>
</template>
<script>
import ProductAdd from './add';
import ProductEdit from './edit';
import ProductImport from './import';

export default {
  name: 'modifyProductView',
  components: {
    ProductAdd,
    ProductEdit,
    ProductImport,
  },
  computed: {
    isAdd() {
      return this.$route && ~this.$route.path.indexOf('add');
    },
    isEdit() {
      return this.$route && ~this.$route.path.indexOf('edit');
    },
    isImport() {
      return this.$route && ~this.$route.path.indexOf('import');
    },
  },
};
</script>
