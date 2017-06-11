<style lang="css">
</style>

<template>
  <div class="card">
    <div class="card-block p-1 clearfix">
      <i class="p-1 font-2xl mr-1 float-left" :class="[icon, brand]"></i>
      <div class="text-uppercase text-muted font-weight-bold font-xs text-right mb-0 mt-h">{{title}}</div>
      <div class="h5 text-right">{{val}}</div>
    </div>
    <div class="card-footer px-1 py-h">
      <router-link :to="{ path: link}" class="font-weight-bold font-xs btn-block text-muted">View More <i class="fa fa-angle-right float-right font-lg"></i></router-link>
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
    link: {
      type: String,
      default: '/'
    },
    icon: {
      type: String,
      required: true,
      default: 'fa fa-cogs'
    },
    brand: {
      type: String,
      default: 'bg-primary'
    }
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
