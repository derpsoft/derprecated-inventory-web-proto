<template>
<crud-list :records="value" :columns="['', '', '']">
  <template slot="body-row" scope="props">
      <tr>
        <td>
          <big><strong :class="{'text-success': props.record.quantity>0, 'text-warning': props.record.quantity<0}">{{props.record.quantity > 0 ? '+' : ''}}{{props.record.quantity}}</strong></big>
        </td>
        <td>
          {{props.record.product.title | truncate(40)}}
        </td>
        <td>{{props.record.createDate | ago}}</td>
      </tr>

</template>
  </crud-list>
</template>

<script>
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
    count() {
      return this.$store.getters.logCount;
    },
    logs() {
      return this.$store.getters.logs;
    },
  },

  watch: {
    logs: 'refresh'
  },

  methods: {
    refresh() {
      this.value = this.logs;
    },
  },
};

</script>
