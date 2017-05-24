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
      label: null,
      series: {
        dispatched: [0],
        received: [0],
        sales: [0]
      },
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
    dashboardSeries() {
      return JSON.parse(JSON.stringify(this.$store.getters.dashboard));
    },
  },
  watch: {
    dashboardSeries: 'loadChart'
  },
  methods: {
    buildSeries(list, dataset) {
      const arr = [];
      let index = -1;

      list.forEach((value) => {
        index = dataset.labels.indexOf(value);

        if (index > -1) {
          arr.push(dataset.series[index]);
        } else {
          arr.push(0);
        }
      });

      return arr;
    },
    createLabels(labels) {
      const fmt = x => moment.utc(x).format('LL');
      return _.map(labels, fmt);
    },
    createDataKeyList(labels) {
      return _.map(_.sortBy(_.uniq(labels)));
    },
    loadChart() {
      const dataList = this.createDataKeyList([
        ...this.dashboardSeries.received.labels,
        ...this.dashboardSeries.dispatched.labels,
        ...this.dashboardSeries.sales.labels
      ]);

      this.series.received = this.buildSeries(dataList, this.dashboardSeries.received);
      this.series.dispatched = this.buildSeries(dataList, this.dashboardSeries.dispatched);
      this.series.sales = this.buildSeries(dataList, this.dashboardSeries.sales);

      this.labels = this.createLabels(dataList);

      this.renderSummary();
    },
    renderSummary() {
      this.chartJsData = {
        labels: this.labels,
        datasets: [
          {
            label: 'Total Sales',
            borderColor: 'rgba(247, 175, 62, 1)',
            pointBackgroundColor: 'rgba(247, 175, 62, 1)',
            borderWidth: 1,
            pointBorderColor: 'white',
            backgroundColor: 'rgba(247, 175, 62, 0.5)',
            data: this.series.sales
          }, {
            label: 'Total Received',
            borderColor: 'rgba(54, 177, 222, 1)',
            pointBackgroundColor: 'rgba(54, 177, 222, 1)',
            pointBorderColor: 'white',
            borderWidth: 1,
            backgroundColor: 'rgba(54, 177, 222, 0.5)',
            data: this.series.received
          }, {
            label: 'Total Dispatched',
            borderColor: 'rgba(27, 191, 137, 1)',
            pointBackgroundColor: 'rgba(27, 191, 137, 1)',
            pointBorderColor: 'white',
            borderWidth: 1,
            backgroundColor: 'rgba(27, 191, 137, 0.5)',
            data: this.series.dispatched
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
