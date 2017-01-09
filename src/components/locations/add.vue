<template>
<div>
  <form id="location-add-form" @submit.prevent="validate">
    <div class="row control-row">
      <div class="col-md-12">
        <button class="btn btn-primary pull-right" type="submit">Save</button>
        <h4>New Location Details</h4>
      </div>
    </div>
    <div class="panel panel-filled panel-main">
      <div class="panel-body">
        <div class="media">
          <div class="form-group">
            <label>Warehouse</label>

            <autocomplete :suggestions="warehouses" :key-selector="(v) => `${v.name}`" :value-selector="(v) => v" :display-selector="(v) => `${v.id}: ${v.name}`" @change="setWarehouse">
            </autocomplete>
          </div>
          <div class="form-group" :class="{'has-error': errors.has('locationName')}">
            <label>Name</label>
            <input type="text" class="form-control" placeholder="Name" v-model="location.name" name="locationName" v-validate.initial="location.name" data-vv-rules="required">
            <span v-show="errors.has('locationName')" class="help-block">Location Name is required.</span>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>
</template>

<script>
import Constants from '../../constants';
import store from '../../stores/store';
import Autocomplete from '../autocomplete.vue';

export default {
  components: {
    Autocomplete
  },
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
    store.dispatch(Constants.GET_WAREHOUSES, {
      skip: 0,
      take: 1000
    });
  },
  methods: {
    validate() {
      this.$validator.validateAll().then((success) => {
        if (!success) {
          return;
        }
        this.save();
      });
    },
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
