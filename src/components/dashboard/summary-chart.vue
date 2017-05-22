<style lang="css">
</style>

<template>
  <line-chart :options="chartJsOptions" :chart-data="chartJsData"></line-chart>
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
import LineChart from './line-chart';

export default {
  name: 'summary-chart',
  data () {
    return {
      chartJsData: null,
      chartJsOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  components: {
    LineChart,
  },
  computed: {
    labels() {
      const fmt = x => moment.utc(x).format('LL');
      return [
        _.map(this.$store.getters.dashboard.received.labels, fmt),
        _.map(this.$store.getters.dashboard.dispatched.labels, fmt),
        _.map(this.$store.getters.dashboard.sales.labels, fmt),
      ];
    },
    series() {
      return [
        this.$store.getters.dashboard.received.series,
        this.$store.getters.dashboard.dispatched.series,
        this.$store.getters.dashboard.sales.series
      ];
    },
  },
  methods: {
    renderSummary() {
      this.chartJsData = {
        datasets: [
          {
            label: 'Total Sales',
            borderColor: 'rgba(247, 175, 62, 1)',
            pointBackgroundColor: 'rgba(247, 175, 62, 1)',
            borderWidth: 1,
            pointBorderColor: 'white',
            backgroundColor: 'rgba(247, 175, 62, 0.5)',
            data: this.series[2]
          }, {
            label: 'Total Received',
            borderColor: 'rgba(54, 177, 222, 1)',
            pointBackgroundColor: 'rgba(54, 177, 222, 1)',
            pointBorderColor: 'white',
            borderWidth: 1,
            backgroundColor: 'rgba(54, 177, 222, 0.5)',
            data: this.series[0]
          }, {
            label: 'Total Dispatched',
            borderColor: 'rgba(27, 191, 137, 1)',
            pointBackgroundColor: 'rgba(27, 191, 137, 1)',
            pointBorderColor: 'white',
            borderWidth: 1,
            backgroundColor: 'rgba(27, 191, 137, 0.5)',
            data: this.series[1]
          }
        ],
      };
    }
  },
  mounted () {
    this.renderSummary();
  }
};
</script>
