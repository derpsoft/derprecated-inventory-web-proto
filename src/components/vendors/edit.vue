<template>
<div>
  <div class="row control-row">
    <div class="col-md-12">
      <button class="btn btn-primary pull-right" @click="save">Save</button>
      <h4>Vendor Details</h4>
    </div>
  </div>
  <div class="panel panel-filled panel-main">
    <div class="panel-body">
      <form>
        <div class="media">
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" placeholder="Name" v-model="vendor.name">
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import Constants from '../../constants';
import store from '../../stores/store';

export default {
  data() {
    return {
      vendor: {},
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
      store.dispatch(Constants.GET_VENDOR, {
        id: this.id,
      });
    },
    save() {
      const vendor = JSON.parse(JSON.stringify(this.vendor));
      vendor.id = this.id;
      store.dispatch(Constants.SAVE_VENDOR, {
        vendor
      });
    }
  },
  created() {
    store.watch(() => store.getters.vendor, (current) => {
      this.vendor = Object.assign({}, current);
    });
    this.load();
  }
};
</script>
