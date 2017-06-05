<style scoped>
.btn-return {
  margin-right: -15px;
}
</style>

<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-w-md btn-accent btn-return" :to="{path: '/sales'}">Back to Sales</router-link>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-plus"></i>
          </div>
          <div class="header-title">
            <h3>{{ isAdd ? 'Add' : 'Edit' }} Sale</h3>
            <small>Record a sale</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <sale-add v-if="isAdd"></sale-add>
      </div>
    </div>
  </div>
</template>

<script>
import SaleAdd from './add';

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
    SaleAdd,
  },
};
</script>
