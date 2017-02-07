<template>
<div>
  <div class="row control-row">
    <div class="col-md-12">
      <button type="button" class="btn btn-danger" @click="deleteConfirm" v-can-delete-vendors>Delete</button>
      <button class="btn btn-primary pull-right" @click="save">Save Vendor</button>
      <h4>Vendor Details</h4>
    </div>
  </div>
  <div class="panel panel-filled panel-main">
    <div class="panel-body">
      <vendor-form ref="vendorForm" :id="id"></vendor-form>
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

  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    }
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
        redirect: this.redirect,
      });
    },
  }
};

</script>
