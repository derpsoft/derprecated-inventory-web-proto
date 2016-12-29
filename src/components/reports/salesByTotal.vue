<script>
import {
  Bar,
} from 'vue-chartjs';

export default Bar.extend({
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
          label: 'GitHub Commits',
          backgroundColor: '#f87979',
          data: this.data,
        }]
      });
    }
  },
  mounted() {
    this.render();
  }
});
</script>
