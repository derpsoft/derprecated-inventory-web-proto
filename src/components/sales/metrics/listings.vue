<style lang="css">
</style>

<template>
<achievement :value="report" title="Active Listings" by="Month" icon="fa-hashtag">
</achievement>
</template>

<script>
import Achievement from 'shared/achievement';
import Constants from 'src/constants';

export default {
  name: 'listings',
  components: {
    Achievement,
  },
  computed: {
    report() {
      return this.$store.getters.listingCountByUser();
    },
  },
  mounted() {
    this.$store.dispatch(Constants.GET_DASHBOARD_LISTINGS_BY_USER);
  },
  methods: {
  },
};

</script>
