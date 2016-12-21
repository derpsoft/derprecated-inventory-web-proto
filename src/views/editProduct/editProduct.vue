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
            <h3>Edit Product</h3>
            <small>Make modifications</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <product-edit></product-edit>
      </div>
    </div>
  </div>
</section>
</template>
<script>
import ProductEdit from '../../components/products/edit.vue';

export default {
  data() {
    return {};
  },
  components: {
    ProductEdit,
  },
  created() {},
};
</script>

<style scope>
.btn-return {
  margin-right: -15px;
}
</style>
