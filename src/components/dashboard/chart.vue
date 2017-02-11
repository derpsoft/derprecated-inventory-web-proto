<style lang="css">
.ct-chart {
    .ct-series-a {
        .ct-point {
            stroke: #1bbf89;
        }
        .ct-line {
            stroke: #1bbf89;
        }
    }

    .ct-series-b {
        .ct-point {
            stroke: #56C0E0;
        }
        .ct-line {
            stroke: #56C0E0;
        }
    }
    .ct-series-c {
        .ct-point {
            stroke: #f7af3e;
        }
        .ct-line {
            stroke: #f7af3e;
        }
    }
    .ct-label {
        color: #949ba2 !important;
        font-size: 10px !important;
    }
    .ct-grid {
        color: #f6a821 !important;
    }
}
</style>

<template>
<div>
  <chart :series="series" :labels="labels" :options="options">
  </chart>
</div>
</template>

<script>
import _ from 'lodash';
import Chart from 'shared/chart';

export default {
  name: 'dashboard-chart',
  components: {
    Chart,
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
    options() {
      return {
        fullWidth: true,
        chartPadding: {
          right: 40
        },
        height: '500px'
      };
    },
  },
};
</script>
