<template>
  <div class="image">
    <div>
      <button class="btn btn-primary" v-if="value.src" @click="remove">-</button>
    </div>
    <img :src="value.src" />
  </div>
</template>

<style lang="less" scope>
  .image {
    img {
      width: 300px;
      height: 300px;
    }
  }
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
        src: '',
      },
      filename: '',
      showUpload: false,
    };
  },

  computed: {
    input() {
      return this.$el.querySelector('input[type=file]');
    }
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
    prompt() {
      this.input.click();
    },
    save() {
      if (this.isValid) {
        // todo
      }
    },
    remove() {
      if (this.allowRemove) {
        this.$emit('remove', this.value);
        this.value = { src: '' };
      }
    },
    imageSelected() {
      const { files } = this.input;

      if (files && files.length) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.value.src = e.target.result;
        };
        reader.readAsDataURL(files[0]);
      }
    },
  },
};
</script>
