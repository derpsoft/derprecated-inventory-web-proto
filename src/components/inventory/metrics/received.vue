<style lang="css">
</style>

<template>
<achievement :value="report.total" title="Received" by="Month" icon="fa-truck" brand="info">
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
      return this.$store.getters.received;
    },
    user() {
      return this.$store.getters.profile;
    }
  },
  mounted() {
    // $FlowFixMe
    this.$store.dispatch(Constants.GET_INVENTORY_RECEIVED_BY_USER, {
      id: this.user.id
    });
  },
  methods: {},
};
</script>
