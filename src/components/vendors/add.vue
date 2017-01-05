<template>
<div>
  <form id="vendor-add-form" @submit.prevent="validate">
    <div class="row control-row">
      <div class="col-md-12">
        <button class="btn btn-primary pull-right" type="submit">Create Vendor</button>
        <h4>Vendor Details</h4>
      </div>
    </div>
  </div>
  <div class="panel panel-filled panel-main">
    <div class="panel-body">
      <vendor-form @change="setVendor" @validate="setValid"></vendor-form>
    </div>
  </form>
</div>
</template>

<script>
import Constants from '../../constants';
import store from '../../stores/store';
import VendorForm from './form.vue';

export default {
  components: { VendorForm },
  data() {
    return {
      vendor: {},
      isValid: false,
    };
  },
  methods: {
    redirect() {
      this.$router.push({ path: '/vendors' });
    },
    save() {
      if(this.isValid) {
        const vendor = JSON.parse(JSON.stringify(this.vendor));
        const redirect = this.redirect;

        vendor.id = this.id;
        this.$store.dispatch(Constants.CREATE_VENDOR, {
          vendor,
          redirect,
        });
      }
    },
    setVendor(v) {
      this.vendor = Object.assign({}, this.vendor, v);
    },
    setValid(flag) {
      this.isValid = flag;
    },
  }
};
</script>
