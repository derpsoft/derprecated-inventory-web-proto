<style lang="css">
</style>

<template>
    <achievement :value="report.sales.total" title="Total Sales" by="Month" icon="fa-dollar" brand="warning" :filter="formatMoney"></achievement>
</template>

<script>
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
    formatMoney(x) {
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
