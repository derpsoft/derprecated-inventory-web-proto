<template>

</template>

<script>
import Constants from '../../constants';

export default {
  name: 'loginView',
  created() {
    this.$store.dispatch(Constants.LOGOUT);
  }
};
</script>
