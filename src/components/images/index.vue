<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <button class="btn btn-w-md btn-accent" v-can-upsert-images @click="showUpload=!showUpload">Add New Images</button>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-culture"></i>
          </div>
          <div class="header-title">
            <h3>Images</h3>
            <small>Find all images</small>
          </div>
        </div>
        <hr>
      </div>
    </div>

    <div class="row" v-show="showUpload">
      <image-upload ref="imageGallery" :allowRemove="false" :uploadUrl="uploadUrl" :on-sending="xhrIntercept"></image-upload>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-filled panel-main">
          <div class="panel-body">
            <search :searchActionName="searchAction" :listActionName="listAction" :clearActionName="clearAction"></search>
            <image-list></image-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</template>

<script>
import Constants from 'src/constants';
import Search from 'components/search';
import Api from 'services/imageApi';
import ImageList from './list';
import ImageUpload from './upload';

export default {
  name: 'images',

  components: {
    ImageList,
    Search,
    ImageUpload,
  },

  data() {
    return {
      searchAction: Constants.SEARCH_IMAGES,
      listAction: Constants.GET_IMAGES,
      clearAction: Constants.CLEAR_IMAGE_SEARCH,
      showUpload: false,
    };
  },

  computed: {
    api() {
      return new Api();
    },
    uploadUrl() {
      return this.api.getImageUploadUrl();
    },
  },

  methods: {
    xhrIntercept(file, xhr) {
      return this.api.imageUploadIntercept(file, xhr);
    },
  },
};

</script>
