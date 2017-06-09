<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Add Vendors
            <div class="card-actions">
              <router-link class="btn btn-secondary btn-return" :to="{path: '/vendors'}">Back to Vendors</router-link>
              <button class="btn btn-primary pull-right" @click="save">Create Vendor</button>
            </div>
          </div>
          <div class="card-block">
            <vendor-form ref="vendorForm"></vendor-form>
          </div>
        </div>
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
