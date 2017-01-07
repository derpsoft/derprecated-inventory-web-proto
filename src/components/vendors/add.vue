<template>
<div>
  <form id="vendor-add-form" @submit.prevent="validate">
    <div class="row control-row">
      <div class="col-md-12">
        <button class="btn btn-primary pull-right" type="submit">Create Vendor</button>
        <h4>Vendor Details</h4>
      </div>
    </div>
    <div class="panel panel-filled panel-main">
      <div class="panel-body">
        <div class="form-group" :class="{'has-error': errors.has('vendorName')}">
          <label>Name</label>
          <input type="text" class="form-control" placeholder="Name" name="vendorName" v-model="vendor.name" v-validate.initial="vendor.name" data-vv-rules="required">
          <span v-show="errors.has('vendorName')" class="help-block">{{ errors.first('vendorName') }}</span>
        </div>
      </div>
    </div>
  </form>
</div>
</template>

<script>
import Constants from '../../constants';

export default {
  data() {
    return {
      vendor: {},
    };
  },
  methods: {
    validate() {
      this.$validator.validateAll().then((success) => {
        if (!success) {
          return;
        }
        this.save();
      });
    },
    save() {
      const vendor = JSON.parse(JSON.stringify(this.vendor));
      vendor.id = this.id;
      this.$store.dispatch(Constants.CREATE_VENDOR, {
        vendor
      });
    }
  }
};
</script>
