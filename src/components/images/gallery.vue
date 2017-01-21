<template>
  <div class="gallery">

    <template v-for="image in images">
      <image-edit :image="image" @remove="remove(image)"></image-edit>
    </template>
    <button class="btn btn-primary" @click="add">Add</button>

  </div>
</template>

<style lang="less" scope>
  .gallery {

  }
</style>

<script>
import ImageEdit from './edit.vue';

export default {
  components: { ImageEdit },

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
    }
  },
};
</script>
