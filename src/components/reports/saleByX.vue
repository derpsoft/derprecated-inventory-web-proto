<template>
  <div>
    <bar-chart :chart-data="chartData"></bar-chart>
  </div>
</template>
<script>
import Constants from '../../constants';
import BarChart from './barChart.vue';

// TODO: Figure out how to use base report.

export default {
  name: 'testReport',
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [{
          label: 'Sales By Product',
          backgroundColor: '#f87979',
          data: [],
        }]
      }
    };
  },
  computed: {
    salesByProduct() {
      return this.$store.getters.salesByTotal;
    }
  },
  watch: {
    salesByProduct: {
      handler() {
        this.formatData();
      },
    }
  },
  methods: {
    formatData() {
      if (this.salesByProduct) {
        this.chartData.labels = this.salesByProduct.labels;
        this.chartData.datasets[0].data = this.salesByProduct.data;
      }
    },
  },
  components: {
    BarChart,
  },
  mounted() {
    this.$store.dispatch(Constants.GET_SALES_BY_TOTAL, {
      groupBy: 'month'
    });
  }
};
</script>
