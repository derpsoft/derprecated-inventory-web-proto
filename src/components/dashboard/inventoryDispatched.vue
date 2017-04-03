<style lang="css">
</style>

<template>
<achievement :value="report.dispatched.total" title="Inventory Dispatched" by="Month" icon="fa-envelope-o" brand="success">
</achievement>
</template>

<script>
// @flow
import Achievement from 'shared/achievement';

export default {
  name: 'total-sales',
  data() {
    return {
      title: 'Inventory Dispatched',
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
