<style lang="css">
</style>

<template>
  <achievement :value="report" title="Shipped" icon="fa fa-ship" brand="bg-success" link="/inventory">
  </achievement>
</template>

<script>
// @flow
import Achievement from 'shared/achievement';
import Constants from 'src/constants';

export default {
  name: 'shipped',
  components: {
    Achievement,
  },
  computed: {
    report() {
      return this.$store.getters.inventoryShippedByUser();
    },
  },
  mounted() {
    // $FlowFixMe
    this.$store.dispatch(Constants.GET_DASHBOARD_INVENTORY_SHIPPED_BY_USER);
  },
  methods: {},
};
</script>
