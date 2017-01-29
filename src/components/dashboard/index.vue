<style lang="less">
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
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-shield"></i>
          </div>
          <div class="header-title">
            <div class="pull-right">
              <small>
                Today is
                <br>
                <span class="c-white">{{ date }}</span>
              </small>
            </div>
            <h3 class="m-b-xs">Derprecated Dashboard Concept</h3>
            <small>Derp overview</small>
          </div>
        </div>
        <hr>
      </div>
      <div class="row" v-is-dev>
        <div class="col-lg-4 col-sm-12">
          <div class="panel panel-filled panel-c-success">
            <div class="panel-body">
              <i class="text-success fa fa-envelope-o pull-right fa-4x m-t-sm"></i>
              <h2 class="m-b-none">
                200
              </h2>
              <small>Inventory Dispatched
                <br>
                by <span class="c-white">Month</span>
              </small>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-12">
          <div class="panel panel-filled panel-c-info">
            <div class="panel-body">
              <i class="text-info fa fa-plus pull-right fa-4x m-t-sm"></i>
              <h2 class="m-b-none">
                100
              </h2>
              <small>
                Inventory Received
                <br>
                by <span class="c-white">Month</span>
              </small>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-12">
          <div class="panel panel-filled panel-c-warning">
            <div class="panel-body">
              <i class="text-warning fa fa-dollar pull-right fa-4x m-t-sm"></i>
              <h2 class="m-b-none">
                888.00
              </h2>
              <small>Total Sales
                <br>
                by <span class="c-white">Month</span>
              </small>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-is-dev>
        <div class="col-md-12">
          <div class="panel panel-filled">
            <div class="panel-body">
              <div class="ct-chart"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import moment from 'moment';
import {
  Line
} from 'chartist';
import 'chartist/dist/chartist.min.css';

export default {
  name: 'dashboardView',
  data() {
    return {
      date: moment().format('LL')
    };
  },
  mounted() {
    /* eslint-disable */
    new Line('.ct-chart', {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      series: [{
        name: 'Inventory Received',
        data: [12, 9, 7, 8, 5],
      }, {
        data: [2, 1, 3.5, 7, 3],
      }, {
        data: [1, 3, 4, 5, 6]
      }]
    }, {
      fullWidth: true,
      chartPadding: {
        right: 40
      },
      height: '500px'
    });

    /* eslint-enable */
  },
  methods: {},
};
</script>
