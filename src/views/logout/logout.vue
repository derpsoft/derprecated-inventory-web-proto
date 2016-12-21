<template>

</template>

<script>
import Constants from '../../constants';

export default {
  created() {
    this.$store.dispatch(Constants.LOGOUT);
  }
};
</script>
