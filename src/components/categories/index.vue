<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-w-md btn-accent" :to="{path: '/categories/add'}">Add New Category</router-link>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-culture"></i>
          </div>
          <div class="header-title">
            <h3>Categories</h3>
            <small>Find all categories</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <category-list></category-list>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import CategoryList from './list.vue';

export default {
  data() {
    return {};
  },
  components: {
    CategoryList,
  },
};
</script>
