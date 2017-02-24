<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-w-md btn-accent btn-return" :to="{path: '/images'}">Back to Images</router-link>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-plus"></i>
          </div>
          <div class="header-title">
            <h3>Edit Image</h3>
            <small>Edit an image</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <image-edit></image-edit>
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
import ImageEdit from './edit';

export default {
  data() {
    return {};
  },
  components: {
    ImageEdit,
  },
};
</script>
