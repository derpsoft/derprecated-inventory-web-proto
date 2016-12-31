<script>
import {
  Line,
} from 'vue-chartjs';

export default Line.extend({
  name: 'salesByTotalReport',
  props: ['labels', 'data'],
  watch: {
    data: {
      handler() {
        this.render();
      }
    }
  },
  methods: {
    render() {
      this.renderChart({
        labels: this.labels,
        datasets: [{
          label: 'Sales By Total',
          backgroundColor: '#edc240',
          showLine: true,
          data: this.data,
        }]
      }, {
        scales: {
          yAxes: [{
            gridLines: {
              color: '#35373e',
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              color: '#35373e',
              display: true
            },
          }]
        }
      });
    }
  },
  mounted() {
    this.render();
  }
});
</script>
