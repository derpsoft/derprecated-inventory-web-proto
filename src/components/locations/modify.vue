<template>
  <main class="main">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">Home</li>
      <li class="breadcrumb-item"><a href="#">Admin</a>
      </li>
      <li class="breadcrumb-item active">Dashboard</li>
    </ol>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-secondary btn-return" :to="{path: '/locations'}">Back to Locations</router-link>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-plus"></i>
          </div>
          <div class="header-title">
            <h3>Edit Location</h3>
            <small>Make modifications</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <location-add v-if="isAdd"></location-add>
        <location-edit v-else></location-edit>
      </div>
    </div>
  </div>
</main>
</template>

<script>
// @flow
import LocationAdd from './add';
import LocationEdit from './edit';

export default {
  name: 'saveLocationView',
  data() {
    return {};
  },
  computed: {
    isAdd() {
      return this.$route && ~this.$route.path.indexOf('add');
    },
  },
  components: {
    LocationAdd,
    LocationEdit,
  },
};
</script>

<style scoped>
.btn-return {
  margin-right: -15px;
}
</style>
