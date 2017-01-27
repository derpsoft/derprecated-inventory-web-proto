<style lang="less" scoped>
.search {
    margin-bottom: 30px;
}
</style>

<template>
<div class="form-group search">
  <input type="text" v-model="searchTerm" class="form-control" placeholder="Search..." autocomplete="no" tabindex="0">
</div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
    };
  },

  props: {
    searchActionName: {
      propType: String,
      required: true,
    },
    listActionName: {
      propType: String,
      required: true,
    },
  },

  watch: {
    searchTerm: 'search',
  },

  methods: {
    search() {
      if (this.searchTerm.length) {
        this.$store.dispatch(this.searchActionName, {
          query: this.searchTerm,
        });
      } else {
        this.$store.dispatch(this.listActionName, {
          skip: 0,
          take: 200
        });
      }
    },
  },
};
</script>
