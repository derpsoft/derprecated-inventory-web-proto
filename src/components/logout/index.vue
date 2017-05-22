<template>

</template>

<script>
// @flow
import Constants from 'src/constants';

export default {
  name: 'logout',
  created() {
    this.$store.dispatch(Constants.LOGOUT);
  }
};
</script>
