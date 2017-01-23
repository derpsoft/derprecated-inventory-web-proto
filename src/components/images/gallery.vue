<template>
<div class="gallery">

  <template v-for="image in images">
      <image-edit :image="image" @remove="remove(image)"></image-edit>
</template>
    <dropzone
      id="imageGallery"
      :url="uploadUrl"
      accepted-file-types="image/*"
      show-remove-link="false"
      max-file-size-in-mb="8"
      auto-process-queue="true"
      :show-remove-link="false"
      :max-file-size-in-mb="8"
      :auto-process-queue="true"
      @vdropzone-sending="onSending"
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

    onSending: {
      type: Function,
      required: false,
      default: () => {},
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
  },
};
</script>
