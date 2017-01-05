<template>
<div>
  <form id="vendor-edit-form" @submit.prevent="validate">
    <div class="row control-row">
      <div class="col-md-12">
        <button class="btn btn-primary pull-right" type="submit">Save Vendor</button>
        <h4>Vendor Details</h4>
      </div>
    </div>
  </div>
  <div class="panel panel-filled panel-main">
    <div class="panel-body">
      <vendor-form :vendor="vendor" @change="setVendor"></vendor-form>
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
  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    }
  },
  watch: {
    $route: 'load'
  },
  methods: {
    load() {
      this.$store.dispatch(Constants.GET_VENDOR, {
        id: this.id,
      });
    },
    save() {
      if(this.isValid) {
        const vendor = JSON.parse(JSON.stringify(this.vendor));
        vendor.id = this.id;
        this.$store.dispatch(Constants.SAVE_VENDOR, {
          vendor
        });
      }
    },
    setVendor(v) {
      this.vendor = Object.assign({}, this.vendor, v);
    },
    setValid(flag) {
      this.isValid = flag;
    },
  },
  mounted() {
    store.watch(
      () => store.getters.vendor,
      v => this.setVendor(v)
    );
    this.load();
  }
};
</script>
