<template>
<div>
  <div class="col-md-12" v-if="!images.length">
    There were no images found. Add images, or try a different query.
  </div>

  <div class="col-md-4" v-for="image in images">
    <img :src="image.url | toSsl" class="img-rounded" v-on:click="edit(image.id)"/>
  </div>
</div>
</template>

<script>
export default {
  name: 'imageList',

  components: {},

  filters: {
    toSsl(src) {
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
    edit(id) {
      this.$router.push(`/images/edit/${id}`);
    }
  },
};
</script>
