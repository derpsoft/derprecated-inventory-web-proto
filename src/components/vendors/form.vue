<template>
  <form>
    <div class="form-group" :class="{'has-error': errors.has('vendorName')}">
      <label>Name</label>
      <input type="text" class="form-control" placeholder="Vendor Name"
        v-model="value.name"
        v-validate.initial="vendor.name" data-vv-rules="required"
        @change="change">
        <span v-show="errors.has('vendorName')" class="help-block">{{ errors.first('vendorName') }}</span>
    </div>
    <div class="form-group">
      <label>Contact Name</label>
      <input type="text" class="form-control" placeholder="Contact Name" v-model="value.contactName" @change="change">
    </div>
    <div class="form-group">
      <label>Contact Email</label>
      <input type="email" class="form-control" placeholder="Contact Email" v-model="value.contactEmail" @change="change">
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
    }
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
      this.$emit('change', this.value);
      this.validate();
    },
    validate() {
      this.$validator
        .validateAll()
        .then(isValid => this.$emit('validate', isValid));
    },
  }
};
</script>
