<style scoped>
small {
  display: block;
  margin-bottom: 10px;;
}


</style>

<template>
<small>
    Today is
    <span>{{ date | formatDate }}</span>
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
    formatDate(x: Object) {
      return x.format('LL');
    },
  },
};
</script>
