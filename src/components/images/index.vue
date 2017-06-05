<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Images
            <div class="card-actions">
              <button class="btn btn-primary" v-can-upsert-images @click="showUpload=!showUpload">Add New Images</button>
            </div>
          </div>

          <div class="card-block" v-show="showUpload">
            <image-upload ref="imageGallery" :allowRemove="false" :uploadUrl="uploadUrl" :on-sending="xhrIntercept" @success="imageUploaded"></image-upload>
          </div>

          <div class="card-block">
            <search ref="search" :searchActionName="searchAction" :listActionName="listAction" :clearActionName="clearAction"></search>
            <image-list></image-list>
          </div>
        </div>
      </div>
    </div>
  </div>
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
