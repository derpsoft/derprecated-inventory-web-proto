<template>
<div>
  <div class="row control-row">
    <div class="col-md-12">
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
import Constants from '../../constants';
import VendorForm from './form.vue';

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

  watch: {
    $route: 'load'
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
            this.$store.dispatch(Constants.SAVE_VENDOR, {
              vendor
            });
          }
        });
    },
  }
};
</script>
