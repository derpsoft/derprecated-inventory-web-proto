<template>
<div>
</div>
</template>

<script>
import {
  Bar
} from 'chartist';
import 'chartist/dist/chartist.min.css';

export default {
  props: {
    labels: {
      type: Array,
      required: true,
    },
    series: {
      type: Array,
      required: true,
    },
    options: {
      type: Object,
      required: false,
      default: {
        fullWidth: true,
        chartPadding: {
          right: 40
        },
        height: '500px',
      },
    },
  },
  watch: {
    series: 'draw',
    labels: 'draw',
    options: 'draw',
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      return new Bar(this.$el, {
        labels: this.labels,
        series: this.series
      }, this.options);
    }
  },
};
</script>
