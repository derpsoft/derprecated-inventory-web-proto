<style lang="css">
</style>

<template>
<achievement :value="report" title="Sales" by="Month" icon="fa-dollar" :brand="report > 0 ? 'success' : 'warning'" :filter="formatMoney">
</achievement>
</template>

<script>
import Achievement from 'shared/achievement';
import Constants from 'src/constants';

export default {
  name: 'my-revenue',

  components: {
    Achievement,
  },

  computed: {
    report() {
      return this.$store.getters.revenueByUser();
    },
  },

  mounted() {
    this.$store.dispatch(Constants.GET_DASHBOARD_REVENUE_BY_USER);
  },

  methods: {
    formatMoney(x: number) {
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
