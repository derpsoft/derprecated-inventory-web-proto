<template>
<div>
  <div v-if="!logs.length">
    There are no inventory logs found.
  </div>

  <crud-list :records="logs">
    <header-row>
      <th>ID</th>
      <th>Product</th>
      <th>Quantity</th>
      <th>Type</th>
      <th>Unit of Measure ID</th>
      <th>User</th>
      <th>Date</th>
    </header-row>
    <template slot="body-row" scope="props">
      <tr>
        <td>{{props.record.id}}</td>
        <product-field tag="td" :id="props.record.productId" field="title"></product-field>
        <td>{{props.record.quantity}}</td>
        <td>{{props.record.transactionType}}</td>
        <td>{{props.record.unitOfMeasureId}}</td>
        <user-field tag="td" :id="props.record.userId" field="userName"></user-field>
        <td>{{props.record.createDate | formatCreateDate}}</td>
      </tr>
    </template>
  </crud-list>
</div>
</template>

<script>
import moment from 'moment';
import Constants from 'src/constants';
import ProductField from 'components/products/field';
import UserField from 'components/users/field';
import CrudList from 'components/crud/list';

export default {
  components: {
    ProductField,
    UserField,
    CrudList,
  },

  mounted() {
    this.$store.dispatch(Constants.GET_INVENTORY_TRANSACTION_LOGS, {
      skip: 0,
      take: 200,
    });
    this.$store.dispatch(Constants.COUNT_INVENTORY_LOGS);
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
        .format('lll');
    }
  },
};

</script>
