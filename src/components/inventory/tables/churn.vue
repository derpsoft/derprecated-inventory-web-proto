<template>
  <crud-list :records="logs" :columns="['', '', '']">
    <template slot="body-row" scope="props">
      <tr>
        <td>
          <big><strong :class="{'text-success': props.record.quantity>0, 'text-warning': props.record.quantity<0}">{{props.record.quantity > 0 ? '+' : ''}}{{props.record.quantity}}</strong></big>
        </td>
        <product-field tag="td" :id="props.record.productId" field="title"></product-field>
        <td>{{props.record.createDate | ago}}</td>
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
  name: 'churn',

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
        .format('lll');
    }
  },
};
</script>
