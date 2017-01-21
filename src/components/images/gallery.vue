<template>
  <div class="gallery">

    <template v-for="image in images">
      <image-edit :image="image" @remove="remove(image)"></image-edit>
    </template>
    <dropzone
      url="/product/images"
      id="productImages"
      accepted-file-types="image/*"
      show-remove-link="false"
      max-file-size-in-mb="8"
      auto-process-queue="true"
      ></dropzone>
  </div>
</template>

<style lang="less" scope>
  .gallery {

  }
</style>

<script>
import Dropzone from 'vue2-dropzone';
import ImageEdit from './edit.vue';

export default {
  components: { ImageEdit, Dropzone },

  props: {
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
    showSuccess(file, response) {
      if (response.result) {
        this.add(response.result);
      }
    },
  },
};
</script>
