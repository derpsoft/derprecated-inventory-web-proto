<style lang="css" scoped>
.order-list {
    td {
        vertical-align: middle;
    }
}
</style>

<template>
<div class="order-list">
  <crud-list :records="value" :columns="['', '', '']">
    <template slot="body-row" scope="props">
      <tr class="editable" @click="showOrder(props.record.id)">
        <td>{{props.record.orderNumber}}</td>
        <td>{{props.record | quantity}} pcs</td>
        <td>{{props.record.shippingAddress.city}}, {{props.record.shippingAddress.state}}</td>
      </tr>
</template>
  </crud-list>
</div>
</template>

<script>
// @flow
import _ from 'lodash';
import CrudList from 'components/crud/list';
import Constants from 'src/constants';

export default {
  name: 'shipping',

  components: {
    CrudList,
  },

  data() {
    return {
      value: [],
    };
  },

  computed: {
    needsShipping() {
      const filter = ['status', Constants.orderStatus.AWAITING_SHIPMENT];
      return _.filter(this.$store.getters.orders, filter);
    },
  },

  filters: {
    quantity({
      offers
    }: Object) {
      return _.sumBy(offers, ({
        quantity
      }) => quantity);
    }
  },

  watch: {
    needsShipping: 'refresh',
  },

  mounted() {
    this.$store.dispatch(Constants.GET_ORDERS, {
      skip: 0,
      take: 200,
    });
    // this.$store.dispatch(Constants.COUNT_ORDERS);
  },

  methods: {
    refresh() {
      this.value = this.needsShipping;
    },
    showOrder(id: number) {
      this.$router.push(`/orders/edit/${id}`);
    },
  },
};
</script>
