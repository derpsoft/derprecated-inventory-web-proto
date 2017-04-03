<style lang="css">
</style>

<template>
<achievement :value="report.received.total" title="Inventory Received" by="Month" icon="fa-plus" brand="info">
</achievement>
</template>

<script>
// @flow
import Achievement from 'shared/achievement';

export default {
  name: 'total-sales',
  data() {
    return {
      title: 'Inventory Received',
      groupBy: 'Month'
    };
  },
  components: {
    Achievement,
  },
  computed: {
    report() {
      return this.$store.getters.dashboard;
    },
  },
};
</script>
