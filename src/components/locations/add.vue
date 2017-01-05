<template>
<div>
  <div class="row control-row">
    <div class="col-md-12">
      <button class="btn btn-primary pull-right" @click="save">Save</button>
      <h4>New Location Details</h4>
    </div>
  </div>
  <div class="panel panel-filled panel-main">
    <div class="panel-body">
      <form>
        <div class="media">
          <div class="form-group">
            <label>Warehouse</label>

            <autocomplete
            :suggestions="warehouses"
            :key-selector="(v) => `${v.name}`"
            :value-selector="(v) => v"
            :display-selector="(v) => `${v.id}: ${v.name}`"
            @change="setWarehouse">
          </autocomplete>
        </div>
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" placeholder="Name" v-model="location.name">
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
import Autocomplete from '../autocomplete.vue';

export default {
  components: { Autocomplete },
  data() {
    return {
      location: {},
      warehouse: {},
    };
  },
  computed: {
    warehouses() {
      return store.getters.warehouseList;
    }
  },
  mounted() {
    store.dispatch(Constants.GET_WAREHOUSES, { skip: 0, take: 1000 });
  },
  methods: {
    save() {
      const location = JSON.parse(JSON.stringify(this.location));
      location.warehouseId = this.warehouse.id;

      store.dispatch(Constants.CREATE_LOCATION, {
        location
      });
    },
    setWarehouse(w) {
      this.warehouse = w;
    }
  }
};
</script>
