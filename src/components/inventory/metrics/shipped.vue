<style lang="css">
</style>

<template>
<achievement :value="report.total" title="Active Listings" by="Month" icon="fa-hashtag">
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
      return this.$store.getters.shipped;
    },
    user() {
      return this.$store.getters.profile;
    }
  },
  mounted() {
    // $FlowFixMe
    this.$store.dispatch(Constants.GET_INVENTORY_SHIPPED_BY_USER, {
      id: this.user.id
    });
  },
  methods: {},
};
</script>
