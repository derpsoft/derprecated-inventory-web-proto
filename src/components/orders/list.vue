<template>
<div>
  <div class="col-md-12" v-if="!orders.length">
    There were no orders found. Please add orders or update the filters.
  </div>
  <crud-list :records="orders" :columns="['Order Number', 'Status', 'Date', 'City', 'State', 'Customer', '']">
    <template slot="body-row" scope="props">
      <tr class="editable" v-on:click="edit(props.record.id)">
        <td>{{props.record.orderNumber}}</td>
        <td>{{props.record.status}}</td>
        <td>{{props.record.createDate | formatCreateDate}}</td>
        <td>{{props.record.shippingAddress.city}}</td>
        <td>{{props.record.shippingAddress.state}}</td>
        <td>{{props.record.billingCustomer.name}}</td>
        <td><a :href="`/orders/summary/${props.record.orderKey}/${props.record.orderNumber}`" target="_blank">Invoice</a></td>
      </tr>
    </template>
  </crud-list>
</div>
</template>

<script>
import moment from 'moment';
import CrudList from 'components/crud/list';

export default {
  components: {
    CrudList
  },

  filters: {
    formatCreateDate(date) {
      return moment.utc(date)
        .local()
        .format('lll');
    },
  },

  computed: {
    orders() {
      const results = this.$store.getters.orderSearch;
      if (results.length) {
        return results;
      }
      return this.$store.getters.orders;
    },
  },

  methods: {
    edit(id) {
      this.$router.push(`/orders/edit/${id}`);
    },
  },
};

</script>
