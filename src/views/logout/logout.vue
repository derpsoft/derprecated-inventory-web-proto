<template>
<div>
</div>
</template>

<script>
import Constants from '../../constants';
export default {
  init() {
    this.$store.dispatch(Constants.LOGOUT);
  }
};
</script>
