<template>
</template>

<style lang="less" scoped>
</style>

<script>

export default {
  components: {},

  props: {
    image: {
      type: Object,
      required: true,
    },
    allowRemove: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  data() {
    return {
      value: {
        sourceUrl: '',
      },
    };
  },

  watch: {
    image: 'refresh',
  },

  mounted() {
    this.refresh();
  },

  methods: {
    refresh() {
      if (this.image) {
        this.value = Object.assign({}, this.value, this.image);
      }
    },
    remove() {
      if (this.allowRemove) {
        this.$emit('remove', this.value);
      }
    },
  },
};
</script>
