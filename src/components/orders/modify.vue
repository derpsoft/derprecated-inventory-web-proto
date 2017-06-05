<style scoped>
</style>

<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            {{ isAdd ? 'Add' : 'Edit' }} Order
            <div class="card-actions">
              <router-link class="btn btn-primary btn-return" :to="{path: '/orders'}">Back to Orders</router-link>
            </div>
          </div>
          <div class="card-block">
            <order-add v-if="isAdd"></order-add>
            <order-edit v-else></order-edit>
          </div>
        </div>
      </div>
    </div>
  </div>
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
