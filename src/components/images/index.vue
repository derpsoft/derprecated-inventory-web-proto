<template>
  <main class="main">
  <ol class="breadcrumb">
    <li class="breadcrumb-item">Home</li>
    <li class="breadcrumb-item"><a href="#">Inventory</a>
    </li>
  </ol>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <button class="btn btn-primary" v-can-upsert-images @click="showUpload=!showUpload">Add New Images</button>
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
      <image-upload ref="imageGallery" :allowRemove="false" :uploadUrl="uploadUrl" :on-sending="xhrIntercept" @success="imageUploaded"></image-upload>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-filled panel-main">
          <div class="panel-body">
            <search ref="search" :searchActionName="searchAction" :listActionName="listAction" :clearActionName="clearAction"></search>
            <image-list></image-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
</template>

<script>
// @flow
import Constants from 'src/constants';
import Search from 'components/search';
import {
  Image as Api
} from 'derp-api';
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
      // $FlowFixMe
      searchAction: Constants.SEARCH_IMAGES,
      // $FlowFixMe
      listAction: Constants.GET_IMAGES,
      // $FlowFixMe
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
    xhrIntercept(file: Object, xhr: Object) {
      return this.api.imageUploadIntercept(file, xhr);
    },
    imageUploaded() {
      this.$refs.search.search();
    },
  },
};
</script>
