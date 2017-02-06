<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-w-md btn-accent btn-return" :to="{path: '/categories'}">Back to Categories</router-link>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-plus"></i>
          </div>
          <div class="header-title">
            <h3>{{ isAdd ? 'Add' : 'Edit' }} Category</h3>
            <small>Create a category</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <category-add v-if="isAdd"></category-add>
        <category-edit v-else></category-edit>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
.btn-return {
  margin-right: -15px;
}
</style>

<script>
import CategoryAdd from './add';
import CategoryEdit from './edit';

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
    CategoryAdd,
    CategoryEdit,
  },
};
</script>
