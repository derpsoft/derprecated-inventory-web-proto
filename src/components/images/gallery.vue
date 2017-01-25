<template>
<div class="gallery">
  <template v-for="image in images">
        <div class="img-container clearfix">
          <a class="delete" v-if="allowRemove" @click="onDelete(image)" title="Delete Image">&times;</a>
          <img :src="image.sourceUrl" />
        </div>
</template>

    <div class="image-upload" v-show="toggle">
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
      :use-font-awesome="true"
      ></dropzone>
    </div>
  </div>
</template>

<style lang="less" scoped>
.image-upload {
    margin-top: 10px;
    .dropzone {
        background: transparent;
        border: 1px dotted #ccc !important;
        font-family: 'Roboto', sans-serif;
        &:hover {
            background-color: #494b54;
            color: #fff;
        }

    }
}
.gallery {
    .dz-message {
        font-size: 20px;
    }
    .img-container {
        display: inline-block;
        position: relative;
        margin-left: 10px;
        &:first-child {
            margin-left: 0;
        }
        &:hover {
            .delete {
                display: initial;
            }
        }
        img {
            width: auto;
            height: 200px;
        }
        .delete {
            display: none;
            position: absolute;
            top: 0;
            right: 10px;
            font-size: 30px;
            color: #fff;
            cursor: pointer;
            text-decoration: none;
        }

    }
}
</style>

<script>
import Dropzone from 'vue2-dropzone';

export default {
  name: 'imageGallery',

  data() {
    return {

    };
  },

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
    },

    toggle: {
      type: Boolean,
      required: false,
      default: false,
    }
  },

  methods: {
    onSuccess(file, json) {
      this.images.push(json.result);
    },
  },
};
</script>
