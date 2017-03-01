<style lang="css" scoped>
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
</style>

<template>
<div class="image-upload">
  <dropzone id="dropzone" :url="uploadUrl" accepted-file-types="image/*" show-remove-link="false"
      max-file-size-in-mb="8" auto-process-queue="true" :show-remove-link="false" :max-file-size-in-mb="8"
      :auto-process-queue="true" @vdropzone-sending="onSending"
      :use-font-awesome="true"></dropzone>
</div>

</template>

<script>
import Dropzone from 'vue2-dropzone';

export default {
  name: 'imageUpload',

  components: {
    Dropzone,
  },

  props: {
    uploadUrl: {
      type: String,
      required: true,
      default: '/api/v1/images',
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
  },

  data() {
    return {};
  },

  methods: {
  },
};

</script>
