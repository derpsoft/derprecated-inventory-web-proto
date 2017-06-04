<style lang="css">
</style>

<template>
  <div class="card">
    <div class="card-block p-1 clearfix">
      <i class="fa fa-cogs bg-primary p-1 font-2xl mr-1 float-left"></i>
      <div class="text-uppercase text-muted font-weight-bold font-xs text-right mb-0 mt-h">{{title}}</div>
      <div class="h5 text-right">{{val}}</div>
    </div>
    <div class="card-footer px-1 py-h">
      <a class="font-weight-bold font-xs btn-block text-muted" href="#">View More <i class="fa fa-angle-right float-right font-lg"></i></a>
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
  },
  watch: {
    value: 'format'
  },
  methods: {
    format(value: number) {
      this.val = this.filter ? this.filter(value) : value;
    }
  }
};
</script>
