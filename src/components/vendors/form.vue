<template>
  <form @submit.prevent="validate">
    <div class="form-group" :class="{'has-error': errors.has('name')}">
      <label>Name</label>
      <input type="text" class="form-control" placeholder="Vendor Name" name="name"
        v-model="value.name"
        v-validate.initial="value.name" data-vv-rules="required"
        @change="change">
        <span v-show="errors.has('name')" class="help-block">{{ errors.first('name') }}</span>
    </div>
    <div class="form-group">
      <label>Contact Name</label>
      <input type="text" class="form-control" placeholder="Contact Name" v-model="value.contactName" @change="change">
    </div>
    <div class="form-group" :class="{'has-error': errors.has('contactEmail')}">
      <label>Contact Email</label>
      <input type="email" class="form-control" placeholder="Contact Email" name="contactEmail"
        v-model="value.contactEmail"
        v-validate.initial="value.contactEmail" data-vv-rules="required|email"
        @change="change">
      <span v-show="errors.has('contactEmail')" class="help-block">{{ errors.first('contactEmail') }}</span>
    </div>
    <div class="form-group">
      <label>Contact Address</label>
      <textarea class="form-control" placeholder="Contact Address" v-model="value.contactAddress" @change="change"></textarea>
    </div>
    <div class="form-group">
      <label>Contact Phone</label>
      <input type="tel" class="form-control" placeholder="Contact Phone" v-model="value.contactPhone" @change="change"></textarea>
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
    vendor: {
      type: Object,
      required: false
    },
  },

  watch: {
    vendor: 'refresh'
  },

  methods: {
    refresh() {
      if (this.vendor) {
        this.value = Object.assign({}, this.value, this.vendor);
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
