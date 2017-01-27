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
    searchOnMount: {
      propType: Boolean,
      required: false,
      default: true,
    },
    skip: {
      propType: Number,
      required: false,
      default: 0,
    },
    take: {
      propType: Number,
      required: false,
      default: 200,
    },
  },

  watch: {
    searchTerm: 'search',
  },

  computed: {
    params() {
      return {
        query: this.searchTerm,
        skip: this.skip,
        take: this.take,
      };
    },
    action() {
      return this.searchTerm.length ? this.searchActionName : this.listActionName;
    },
  },

  mounted() {
    if (this.searchOnMount) {
      this.search();
    }
  },

  methods: {
    search() {
      this.$store.dispatch(this.action, this.params);
    },
  },
};
</script>
