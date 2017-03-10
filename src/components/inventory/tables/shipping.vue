<template>
  <crud-list :records="logs" :columns="['Product', 'Quantity', 'Date']">
    <template slot="body-row" scope="props">
      <tr>
        <product-field tag="td" :id="props.record.productId" field="title"></product-field>
        <td>{{props.record.quantity}}</td>
        <td>{{props.record.createDate | formatCreateDate}}</td>
      </tr>
    </template>
  </crud-list>
</template>

<script>
import moment from 'moment';
import ProductField from 'components/products/field';
import UserField from 'components/users/field';
import CrudList from 'components/crud/list';

export default {
  name: 'shipping',

  components: {
    ProductField,
    UserField,
    CrudList,
  },

  computed: {
    count() {
      return this.$store.getters.logCount;
    },
    logs() {
      return this.$store.getters.logs;
    },
  },

  filters: {
    formatCreateDate(date) {
      return moment(date)
        .format('MMM d, Y');
    }
  },
};
</script>
