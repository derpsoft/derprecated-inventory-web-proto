<style lang="css">
  .achievement {
    &.panel {
      .panel-body {
        background: #2a2d35;
        padding-left: 30px;
        padding-right: 30px;

        &:hover {
          background: #24262d;
        }
      }
    }

    .fa {
      margin-top: 25px;

    }
    .desc {
      font-size: 1.1em;
      color: rgba(255,255,255, 0.8);

      small {
        font-size: 0.9em;
        color: rgba(255,255,255, 0.8);
      }
    }
    .value {
      font-size: 4em;
      color: #fff;
      font-weight: bold;
    }
  }
</style>

<template>
<div class="achievement panel panel-filled" :class="{ [`panel-c-${brand}`]: true }">
  <div class="panel-body">
    <i class="fa pull-right fa-4x m-t-sm" :class="{ [icon]: true, [`text-${brand}`]: true }"></i>
    <h4 class="desc m-b-none">
      {{title}} -
    <small>
      by <span>{{ by }}</span>
    </small>
    </h4>

    <div class="value">
      {{val}}
    </div>
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
    format(value: number) {
      this.val = this.filter ? this.filter(value) : value;
    }
  }
};
</script>
