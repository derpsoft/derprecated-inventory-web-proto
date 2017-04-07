<style lang="css">
</style>

<template>
<achievement :value="report.total" title="Sales" by="Month" icon="fa-dollar" :brand="report.total > 0 ? 'success' : 'warning'" :filter="formatMoney">
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
      return this.$store.getters.myRevenue;
    },
    user() {
      return this.$store.getters.profile;
    }
  },

  mounted() {
    this.$store.dispatch(Constants.GET_REVENUE_BY_USER, {
      id: this.user.id
    });
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
