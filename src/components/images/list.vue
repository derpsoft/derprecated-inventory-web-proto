<style lang="css" scoped>
.image-list {
  img {
    cursor: pointer;
  }
}
</style>

<template>
<div class="image-list">
  <div class="col-md-12" v-if="!images.length">
    There were no images found. Add images, or try a different query.
  </div>

  <div class="col-md-4" v-for="image in images">
    <img :src="image.url | toSsl" class="img-responsive center-block img-rounded" v-on:click="edit(image.id)" />
  </div>
</div>
</template>

<script>
export default {
  name: 'imageList',

  components: {},

  computed: {
    images() {
      const results = this.$store.getters.imageSearch;
      if (results.length) {
        return results;
      }
      return this.$store.getters.images;
    },
  },

  methods: {
    edit(id: number) {
      this.$router.push(`/images/edit/${id}`);
    }
  },
};
</script>
// @flow
