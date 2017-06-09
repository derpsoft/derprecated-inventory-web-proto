<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Add Vendors
            <div class="card-actions">
              <router-link class="btn btn-secondary btn-return" :to="{path: '/vendors'}">Back to Vendors</router-link>
              <button type="button" class="btn btn-danger" @click="deleteConfirm" v-can-delete-vendors>Delete</button>
              <button class="btn btn-primary pull-right" @click="save">Save Vendor</button>
            </div>
          </div>
          <div class="card-block">
            <vendor-form ref="vendorForm" :id="id"></vendor-form>
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
  name: 'editVendor',
  components: {
    VendorForm
  },

  data() {
    return {};
  },

  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    },
    vendor() {
      return this.$store.getters.vendor(this.id);
    },
  },

  methods: {
    save() {
      this.$refs.vendorForm.validate()
        .then(({
          isValid,
          vendor
        }) => {
          if (isValid) {
            vendor.id = this.id;
            this.$store.dispatch(Constants.UPDATE_VENDOR, {
              vendor
            });
          }
        });
    },
    deleteConfirm() {
      /* eslint-disable no-alert */
      if (window.confirm('Are you sure you want to delete?')) {
        this.delete();
      }
      /* eslint-enable no-alert */
    },

    delete() {
      this.$store.dispatch(Constants.DELETE_VENDOR, {
        id: this.id,
        rowVersion: this.vendor.rowVersion,
        redirect: this.redirect,
      });
    },
  }
};

</script>
