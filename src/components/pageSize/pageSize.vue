<template>
  <div class="form-inline">
    <div class="form-group clearfix">
      <label>Page Size</label>
      <select class="form-control page-size" v-model="pageSize" v-on:change="setPageSize(pageSize)">
        <option  v-for="pageSize in pageSizes">
          {{ pageSize }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageSize: {
      type: Number,
      required: true,
    },
    callback: {
      type: Function,
      required: true,
    }
  },
  data() {
    return {
      pageSizes: [10, 25, 50, 100],
    };
  },
  methods: {
    setPageSize(pageSize) {
      this.callback(pageSize);
    }
  }
};
</script>

<style lang="css">
  .page-size {
    max-width: 80px;
  }
</style>
