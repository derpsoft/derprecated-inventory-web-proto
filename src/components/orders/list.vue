<style lang="less" scoped>
</style>

<template>
<div>
  <div class="col-md-12" v-if="!orders.length">
    There were no orders found. Please add orders or update the filters.
  </div>
  <crud-list :records="orders" :columns="['orderNumber', 'merchant']">
  </crud-list>
</div>
</template>

<script>
import CrudList from 'components/crud/list';

export default {
  components: {
    CrudList
  },

  computed: {
    orders() {
      const results = this.$store.getters.orderSearch;
      if (results.length) {
        return results;
      }
      return this.$store.getters.orders;
    },
  },
};

</script>
