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
        <vendor-form :vendor="vendor" @change="setVendor" @is-valid="setValid"></vendor-form>
      </div>
    </div>
  </div>
</template>

<script>
import Constants from '../../constants';
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
      if (this.isValid) {
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
    this.$store.watch(
      () => this.$store.getters.vendor,
      v => this.setVendor(v)
    );
    this.load();
  }
};
</script>
