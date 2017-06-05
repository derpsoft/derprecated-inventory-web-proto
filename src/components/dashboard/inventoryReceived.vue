<style lang="css">
</style>

<template>
<achievement :value="report.received.total" title="Inventory Received" link="/inventory/dashboard" icon="fa fa-ship">
</achievement>
</template>

<script>
// @flow
import Achievement from 'shared/achievement';

export default {
  name: 'total-sales',
  data() {
    return {
      title: 'Inventory Received'
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
