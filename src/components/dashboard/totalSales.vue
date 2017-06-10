<style lang="css">
</style>

<template>
  <achievement :value="report.sales.total" title="Total Sales" icon="fa fa-dollar" brand="bg-success" link="/sales/dashboard" :filter="formatMoney">
  </achievement>
</template>

<script>
// @flow
import Achievement from 'shared/achievement';

export default {
  name: 'total-sales',
  components: {
    Achievement,
  },
  computed: {
    report() {
      return this.$store.getters.dashboard;
    },
  },
  methods: {
    formatMoney(x: number) {
      // $FlowFixMe
      return Intl
        .NumberFormat('en-US', {
          style: 'currency',
          currencyDisplay: 'symbol',
          currency: 'USD',
        })
        .format(x);
    },
  },
};
</script>
