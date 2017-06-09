<style lang="css">
</style>

<template>
  <achievement :value="report.dispatched.total" title="Inventory Dispatched" link="/inventory/dashboard" icon="fa fa-truck" brand="bg-warning">
  </achievement>
</template>

<script>
// @flow
import Achievement from 'shared/achievement';

export default {
  name: 'total-sales',
  data() {
    return {
      title: 'Inventory Dispatched'
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
