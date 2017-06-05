<style lang="css">
</style>

<template>
<achievement :value="report" title="Closed Sales" icon="fa fa-line-chart" brand="bg-success" link="/sales"></achievement>
</template>

<script>
import Achievement from 'shared/achievement';
import Constants from 'src/constants';

export default {
  name: 'my-sales',
  components: {
    Achievement,
  },
  computed: {
    report() {
      return this.$store.getters.salesByUser();
    },
  },
  mounted() {
    this.$store.dispatch(Constants.GET_DASHBOARD_SALES_BY_USER);
  },
  methods: {
  },
};

</script>
