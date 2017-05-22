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
            <router-link class="btn btn-w-md btn-accent btn-return" :to="{path: '/orders'}">Back to Orders</router-link>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-plus"></i>
          </div>
          <div class="header-title">
            <h3>{{ isAdd ? 'Add' : 'Edit' }} Order</h3>
            <small>Create an order</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <order-add v-if="isAdd"></order-add>
        <order-edit v-else></order-edit>
      </div>
    </div>
  </div>
</section>
</template>

<script>
// @flow
import OrderAdd from './add';
import OrderEdit from './edit';

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
    OrderAdd,
    OrderEdit,
  },
};
</script>
