<style lang="less" scoped>
table.log-list {
    tr {
        cursor: pointer;
    }
}
</style>

<template>
<div>
  <div v-if="!logs.length">
    There are no inventory logs found.
  </div>
  <div class="col-md-12">
    <div class="table-responsive">
      <table class="table table-striped table-hover log-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Type</th>
            <th>Unit of Measure ID</th>
            <th>User</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in logs">
            <td>{{log.id}}</td>
            <product-field tag="td" :id="log.productId" field="title"></product-field>
            <td>{{log.quantity}}</td>
            <td>{{log.transactionType}}</td>
            <td>{{log.unitOfMeasureId}}</td>
            <user-field tag="td" :id="log.userId" field="userName"></user-field>
            <td>{{log.createDate | formatCreateDate}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment';
import Constants from 'src/constants';
import ProductField from 'components/products/field';
import UserField from 'components/users/field';

export default {
  components: {
    ProductField,
    UserField,
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
      return moment(date).format('lll');
    }
  },
};
</script>
