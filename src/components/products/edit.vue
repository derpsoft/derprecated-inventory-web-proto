<template>
<div>
  <div class="row">
    <div class="col-md-12">
      <product-form ref="productForm" :id="id"></product-form>
    </div>
  </div>
</div>
</template>

<script>
import ProductForm from './form.vue';

export default {
  name: 'productEdit',
  components: {
    ProductForm
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    },
  }
};
</script>
