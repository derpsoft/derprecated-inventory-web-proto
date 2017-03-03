<style lang="css" scoped>
.alert {
    margin-top: 10px;
}
</style>

<template>
<div v-once>
</div>

</template>

<script>
import Constants from 'src/constants';

export default {
  name: 'loginForm',

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },

  watch: {
    isAuthenticated: 'refresh'
  },

  mounted() {
    this.refresh();
  },

  methods: {
    refresh() {
      if (!this.isAuthenticated) {
        this.$store.dispatch(Constants.LOGIN);
      } else {
        this.$router.go('/');
      }
    },
  },
};

</script>
