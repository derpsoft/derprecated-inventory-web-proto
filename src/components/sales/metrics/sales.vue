<style lang="css">
</style>

<template>
<achievement :value="report.total" title="Closed Sales" by="Month" icon="fa-line-chart" brand="success"></achievement>
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
      return this.$store.getters.mySales;
    },
    user() {
      return this.$store.getters.profile;
    }
  },
  mounted() {
    this.$store.dispatch(Constants.GET_SALES_BY_USER, {
      id: this.user.id
    });
  },
  methods: {
  },
};

</script>
