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
      <th>Date</th>
    </header-row>
    <template slot="body-row" scope="props">
      <tr>
        <td>{{props.record.id}}</td>
        <td>{{props.record.produc.title | truncate(100)}}</td>
        <td>{{props.record.quantity}}</td>
        <td>{{props.record.transactionType}}</td>
        <td>{{props.record.createDate | ago}}</td>
      </tr>
    </template>
  </crud-list>
</div>
</template>

<script>
import Constants from 'src/constants';
import CrudList from 'components/crud/list';

export default {
  components: {
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

  mounted() {
    this.$store.dispatch(Constants.GET_INVENTORY_TRANSACTION_LOGS, {
      skip: 0,
      take: 200,
    });
    this.$store.dispatch(Constants.COUNT_INVENTORY_LOGS);
  },
};

</script>
