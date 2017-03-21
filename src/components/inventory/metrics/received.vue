<style lang="css">
</style>

<template>
<achievement :value="report.total" title="Active Listings" by="Month" icon="fa-hashtag">
</achievement>
</template>

<script>
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
    this.$store.dispatch(Constants.GET_INVENTORY_RECEIVED_BY_USER, {
      id: this.user.id
    });
  },
  methods: {
  },
};

</script>
