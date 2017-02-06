<template>
<div>
  <div class="row control-row">
    <div class="col-md-12">
      <button class="btn btn-primary pull-right" @click="save">Create Vendor</button>
      <h4>Vendor Details</h4>
    </div>
  </div>
  <div class="panel panel-filled panel-main">
    <div class="panel-body">
      <vendor-form ref="vendorForm"></vendor-form>
    </div>
  </div>
</div>
</template>

<script>
import Constants from 'src/constants';
import VendorForm from './form';

export default {
  components: {
    VendorForm
  },
  data() {
    return {};
  },
  methods: {
    redirect() {
      this.$router.push({
        path: '/vendors'
      });
    },
    save() {
      this.$refs.vendorForm.validate()
        .then(({
          isValid,
          vendor
        }) => {
          if (isValid) {
            const redirect = this.redirect;

            vendor.id = this.id;
            this.$store.dispatch(Constants.CREATE_VENDOR, {
              vendor,
              redirect,
            });
          }
        });
    }
  }
};
</script>
