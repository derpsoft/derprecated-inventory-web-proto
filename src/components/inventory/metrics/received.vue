<style lang="css">
</style>

<template>
  <achievement :value="report" title="Received" icon="fa fa-truck" brand="bg-primary" link="/inventory">
  </achievement>
</template>

<script>
// @flow
import Achievement from 'shared/achievement';
import Constants from 'src/constants';

export default {
  name: 'received',
  components: {
    Achievement,
  },
  computed: {
    report() {
      return this.$store.getters.inventoryReceivedByUser();
    },
  },
  mounted() {
    // $FlowFixMe
    this.$store.dispatch(Constants.GET_DASHBOARD_INVENTORY_RECEIVED_BY_USER);
  },
  methods: {},
};
</script>
