<template>
<div class="container-fluid">
  <div class="row">
    <p>{{value.city}}, {{value.state}}</p>
  </div>
</div>
</template>

<script>
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
