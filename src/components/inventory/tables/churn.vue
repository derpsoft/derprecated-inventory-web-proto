<template>
  <crud-list :records="value" :columns="['', '', '', '']">
    <template slot="body-row" scope="props">
      <tr>
        <td>
          <big>
            <strong :class="{'text-success': props.record.quantity>0, 'text-warning': props.record.quantity<0}">
              {{props.record.quantity > 0 ? '+' : ''}}{{props.record.quantity}}
            </strong>
          </big>
        </td>
        <td>{{props.record.product.sku}}</td>
        <td>{{props.record.product.title | truncate(40)}}</td>
        <td>{{props.record.createDate | ago}}</td>
      </tr>
    </template>
  </crud-list>
</template>

<script>
// @flow
import Constants from 'src/constants';
import CrudList from 'components/crud/list';

export default {
  name: 'churn',

  components: {
    CrudList,
  },

  data() {
    return {
      value: [],
    };
  },

  computed: {
    logs() {
      return this.$store.getters.logs;
    },
  },

  watch: {
    logs: 'refresh'
  },

  mounted() {
    this.$store.dispatch(Constants.GET_INVENTORY_TRANSACTION_LOGS, {
      skip: 0,
      take: 10,
    });
  },

  methods: {
    refresh() {
      this.value = this.logs;
    },
  },
};
</script>
