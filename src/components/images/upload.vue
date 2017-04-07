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
  <dropzone ref="dz" id="dropzone" :url="uploadUrl" accepted-file-types="image/*" show-remove-link="false" max-file-size-in-mb="8" auto-process-queue="true" :show-remove-link="false" :max-file-size-in-mb="8" :auto-process-queue="true" @vdropzone-sending="onSending"
      @vdropzone-success="onSuccess" :use-font-awesome="true"></dropzone>
</div>
</template>

<script>
// @flow
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

  computed: {
    zone() {
      return this.$refs.dz;
    }
  },

  methods: {
    onSuccess(file: Object) {
      this.zone.removeFile(file);
      this.$emit('success');
    }
  },
};
</script>
