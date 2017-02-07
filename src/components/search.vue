<style lang="less" scoped>
.search {
    margin-bottom: 30px;
}
</style>

<template>
<div class="form-group search">
  <input type="text" v-model="searchTerm" v-focus="focus" class="form-control" placeholder="Search..." autocomplete="no" tabindex="0" >
</div>
</template>

<script>
import _ from 'lodash';
import {
  mixin as focusMixin
} from 'vue-focus';

export default {
  mixins: [focusMixin],

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
    clearActionName: {
      propType: String,
      required: false,
      default: null,
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
    focus: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  watch: {
    searchTerm() {
      this.callSearch();
    },
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

  beforeDestroy() {
    if (this.clearActionName) {
      this.$store.dispatch(this.clearActionName);
    }
  },

  methods: {

    callSearch: _.debounce(function() {
      this.search();
    }, 200),
    search() {
      this.$store.dispatch(this.action, this.params);
    },
  },
};
</script>
