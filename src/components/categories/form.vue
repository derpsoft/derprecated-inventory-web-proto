<template>
  <form @submit.prevent="validate">
    <div class="form-group" :class="{'has-error': errors.has('name')}">
      <label>Name</label>
      <input type="text" class="form-control" placeholder="Category Name" name="name"
        v-model="value.name"
        v-validate.initial="value.name" data-vv-rules="required"
        @change="change">
        <span v-show="errors.has('name')" class="help-block">{{ errors.first('name') }}</span>
    </div>
  </form>
</template>

<script>

export default {
  data() {
    return {
      value: {}
    };
  },

  props: {
    category: {
      type: Object,
      required: false
    },
  },

  watch: {
    category: 'refresh'
  },

  methods: {
    refresh() {
      if (this.category) {
        this.value = Object.assign({}, this.value, this.category);
        this.validate();
      }
    },
    change() {
      this.validate()
        .then((isValid) => {
          if (isValid) {
            this.$emit('change', this.value);
          }
        });
    },
    validate() {
      return this.$validator
        .validateAll()
        .then((isValid) => {
          this.$emit('is-valid', isValid);
          return isValid;
        });
    },
  }
};
</script>
