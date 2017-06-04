<style lang="css" scoped>
.image-list {
  img {
    cursor: pointer;
  }
}
</style>

<template>
<div class="image-list">
  <div v-if="!images.length">
    There were no images found. Add images, or try a different query.
  </div>

  <div class="row" v-else>
    <div class="col-4 mb-2 p-1" v-for="image in images">
      <img :src="image.url | toSsl" class="" style="max-width: 250px;" v-on:click="edit(image.id)" />
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'imageList',

  components: {},

  filters: {
    toSsl(src: string) {
      return src.replace('http:', 'https:');
    },
  },

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
