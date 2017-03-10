<style lang="css">
</style>

<template>
<div class="panel panel-filled":class="{ [`panel-c-${brand}`]: true }">
  <div class="panel-body">
    <i class="fa pull-right fa-4x m-t-sm" :class="{ [icon]: true, [`text-${brand}`]: true }"></i>
    <h2 class="m-b-none">
      {{ val }}
    </h2>
    <small>{{ title }}
      <br>
      by <span class="c-white">{{ by }}</span>
    </small>
  </div>
</div>
</template>

<script>

export default {
  name: 'achievement',
  data() {
    return {
      val: 0,
    };
  },
  props: {
    value: {
      type: Number,
      required: true,
      default: 0
    },
    title: {
      type: String,
      required: true,
    },
    filter: {
      type: Function,
    },
    by: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: false,
      default: 'info'
    }
  },
  watch: {
    value: 'format'
  },
  methods: {
    format(value) {
      this.val = this.filter ? this.filter(value) : value;
    }
  }
};
</script>
