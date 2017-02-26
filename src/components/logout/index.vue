<template>

</template>

<script>
import Constants from 'src/constants';

export default {
  name: 'logout',
  created() {
    this.$store.dispatch(Constants.LOGOUT);
  }
};
</script>
