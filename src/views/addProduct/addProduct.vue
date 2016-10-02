<template>
<section class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="view-header">
                    <div class="pull-right">
                        <button class="btn btn-w-md btn-accent btn-return" v-link="{path: '/products'}">Back to Products</button>
                    </div>
                    <div class="header-icon">
                        <i class="pe page-header-icon pe-7s-plus"></i>
                    </div>
                    <div class="header-title">
                        <h3>{{ isEdit ? 'Edit' : 'Add' }} Product</h3>
                        <small>{{ isEdit ? 'Make modifications' : 'Create a product' }}</small>
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
  import ProductEdit from '../../components/productEdit/productEdit.vue';
  export default {
    data() {
      return {
        isEdit: false,
      };
    },
    components: {
      ProductEdit,
    },
    created() {
      this.isEdit = this.$route.params.id > 0;
    },
  };
</script>

<style scope>
  .btn-return {
    margin-right: -15px;
  }
</style>
