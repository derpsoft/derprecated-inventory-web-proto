<template>
<div class="table-responsive">
  <table class="table table-striped list">
    <thead>
      <tr>
        <th>Number</th>
        <th>Status</th>
        <th>Invoice</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{value.orderNumber}}</td>
        <td>{{value.status}}</td>
        <td><a :href="`/orders/summary/${value.orderKey}/${value.orderNumber}`" target="_blank">Invoice</a></td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
// @flow
export default {
  name: 'order-status',

  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      value: {},
    };
  },

  computed: {
    order() {
      return this.$store.getters.order(this.id);
    },
  },

  watch: {
    order: 'refresh',
  },

  methods: {
    refresh() {
      this.value = Object.assign({}, this.value, this.order);
    },
  },
};
</script>
