<template>
  <div class="gallery">

    <template v-for="image in images">
      <div class="image">
        <button class="btn btn-danger" v-if="allowRemove" @click="onDelete(image)">delete</button>
        <img :src="image.sourceUrl" />
      </div>
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
      @vdropzone-success="onSuccess"
      ></dropzone>
  </div>
</template>

<style lang="less" scoped>
  html {
    background: none;
  }
  .gallery {
    .image {
      display: inline-block;
      position: relative;;

      button {
        display: none;
        position: absolute;
        top: 10px;
        right: 10px;
      }

      img {
        height: 200px;
        width: auto;
      }

      &:hover {
        button {
          display: initial;
        }
      }
    }
  }
</style>

<script>
import Dropzone from 'vue2-dropzone';

export default {
  components: {
    Dropzone,
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
    onDelete: {
      type: Function,
      required: false,
      default: () => {},
    }
  },

  data() {
    return {};
  },

  methods: {
    add(image) {
      this.images.push(image);
    },
    onSuccess(file, json) {
      this.add(json.result);
    }
  },
};
</script>
