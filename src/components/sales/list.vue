<style lang="css" scoped>
</style>

<template>
  <div>
    <div v-if="!sales.length">
      There were no sales found. Please add sales or update the filters.
    </div>

    <crud-list :records="sales" :columns="['id', 'product', 'user', 'vendor', 'total', 'timestamp']" v-else>
      <template slot="body-row" scope="props">
        <tr>
          <td>{{props.record.id}}</td>
          <product-field tag="td" :id="props.record.productId" field="title" :defaultValue="props.record.productId"></product-field>
          <user-field tag="td" :id="props.record.userAuthId" field="userName" :defaultValue="props.record.userAuthId"></user-field>
          <td>{{props.record.vendorId}}</td>
          <td>{{props.record.total | formatCurrency}}</td>
          <td>{{props.record.timestamp | formatTimestamp}}</td>
        </tr>
      </template>
    </crud-list>
  </div>
</template>

<script>
import moment from 'moment';
import ProductField from 'components/products/field';
import UserField from 'components/users/field';
import CrudList from 'components/crud/list';

export default {
  components: {
    ProductField,
    UserField,
    CrudList,
  },
  computed: {
    sales() {
      const results = this.$store.getters.saleSearch;
      if (results.length) {
        return results;
      }
      return this.$store.getters.sales;
    },
  },

  filters: {
    formatTimestamp(date: Date) {
      return moment(date).format('lll');
    },
    formatCurrency(x: number) {
      return Intl
        .NumberFormat('en-US', {
          style: 'currency',
          currencyDisplay: 'symbol',
          currency: 'USD',
        })
        .format(x);
    },
  },
};
</script>
