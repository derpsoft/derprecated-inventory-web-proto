<script>
import {
  Bar,
  mixins
}
from 'vue-chartjs';

export default Bar.extend({
  mixins: [mixins.reactiveProp],
  methods: {
    render() {
      // console.log(this.chartData);
      this.renderChart(this.chartData);
    }
  },
  mounted() {
    this.render();
  }
});
</script>
