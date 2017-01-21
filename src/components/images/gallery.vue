<template>
<div class="gallery">

  <template v-for="image in images">
      <image-edit :image="image" @remove="remove(image)"></image-edit>
</template>
    <dropzone
      id="productImages"
      :url="uploadUrl"
      accepted-file-types="image/*"
      show-remove-link="false"
      max-file-size-in-mb="8"
      auto-process-queue="true"
      :show-remove-link="false"
      :max-file-size-in-mb="8"
      :auto-process-queue="true"
      @vdropzone-sending="sending"
      ></dropzone>
  </div>
</template>

<style lang="less" scoped>
html {
    background: none;
}
.gallery {
    }
</style>

<script>
import Dropzone from 'vue2-dropzone';
import ImageEdit from './edit.vue';
import ProductApi from '../../services/productApi';

export default {
  components: {
    ImageEdit,
    Dropzone
  },

  props: {
    uploadUrl: {
      type: String,
      required: true,
    },

    images: {
      type: Array,
      required: false,
      default: () => [],
    },

    allowAdd: {
      type: Boolean,
      required: false,
      default: true,
    },

    allowRemove: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  data() {
    return {};
  },

  methods: {
    add() {
      this.images.push({});
    },
    remove() {
      // todo
    },
    sending(file, xhr, form) {
      new ProductApi().imageUploadIntercept(file, xhr, form);
    },
  },
};
</script>
