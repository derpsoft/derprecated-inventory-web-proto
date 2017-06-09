<template>
  <div class="row">
    <p>{{value.city}}, {{value.state}}</p>
  </div>
</template>

<script>
// @flow
export default {
  name: 'address-summary',

  props: {
    address: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
      value: {},
    };
  },

  watch: {
    address: 'refresh',
  },

  mounted() {
    this.refresh();
  },

  methods: {
    refresh() {
      this.value = Object.assign({}, this.address);
    }
  },
};
</script>
