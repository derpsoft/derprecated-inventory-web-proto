<style lang="css">
</style>

<template>
  <small>
    Today is
    <br>
    <span class="c-white">{{ date | formatDate }}</span>
  </small>
</template>

<script>
import moment from 'moment';

export default {
  name: 'today',
  data() {
    return {
      date: moment()
    };
  },
  filters: {
    formatDate(x) {
      return x.format('LL');
    },
  },
};
</script>
