<template>
  <div class="form-group user-search">
    <input type="text" class="form-control" placeholder="Search for User..." autocomplete="no" tabindex="0">
  </div>
</template>

<script>
import Constants from '../../constants';

export default {
  data() {
    return {};
  },
  computed: {
  },
  methods: {
    search() {
      console.log(Constants.USER_SEARCH);
    },
  },
};
</script>

<style lang="less" scoped>
  .user-search {
    margin-bottom: 30px;
  }

</style>
