<template>
  <div></div>
  <table>
    <thead>
    </thead>
    <tbody v-repeat="item in dataset">
    </tbody>
  </table>
</template>

<script>
  export default {
    props: {
      pageSize: {
        type: Array,
      },
      dataset: {
        type: Array
      }
    },
    data() {
      return {


      };
    },
  };
</script>
