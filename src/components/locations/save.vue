<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-w-md btn-accent btn-return" :to="{path: '/locations'}">Back to Locations</router-link>
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
</section>
</template>
<script>
import LocationAdd from './add.vue';
import LocationEdit from './edit.vue';

export default {
  name: 'saveLocationView',
  data() {
    return {
      isAdd: false,
    };
  },
  components: {
    LocationAdd,
    LocationEdit,
  },
  mounted() {
    this.isAdd = this.$route && ~this.$route.path.indexOf('add');
  },
};
</script>

<style scope>
.btn-return {
  margin-right: -15px;
}
</style>
