<template>
<form @submit.prevent="validate">
  <div class="form-group">
    <label>Warehouse</label>

    <autocomplete :focus="!this.warehouseId" :selected="warehouse" :suggestions="warehouses" :key-selector="(v) => `${v.name}`" :value-selector="(v) => v" :display-selector="(v) => `${v.id}: ${v.name}`" @change="setWarehouse"></autocomplete>
  </div>
  <div class="form-group" :class="{'has-error': errors.has('name')}">
    <label>Name</label>
    <input v-focus="this.warehouseId" type="text" class="form-control" placeholder="Location Name" name="name" v-model="value.name" @change="change">
    <span v-show="errors.has('name')" class="help-block">{{ errors.first('name') }}</span>
  </div>
  <div class="form-group" :class="{'has-error': errors.has('shelf')}">
    <label>Shelf</label>
    <input type="text" class="form-control" placeholder="Shelf" name="shelf" v-model="value.shelf" @change="change">
    <span v-show="errors.has('shelf')" class="help-block">{{ errors.first('shelf') }}</span>
  </div>
  <div class="form-group" :class="{'has-error': errors.has('rack')}">
    <label>Rack</label>
    <input type="text" class="form-control" placeholder="Rack" name="rack" v-model="value.rack" @change="change">
    <span v-show="errors.has('rack')" class="help-block">{{ errors.first('rack') }}</span>
  </div>
  <div class="form-group" :class="{'has-error': errors.has('bin')}">
    <label>Bin</label>
    <input type="text" class="form-control" placeholder="Bin" name="bin" v-model="value.bin" @change="change">
    <span v-show="errors.has('bin')" class="help-block">{{ errors.first('bin') }}</span>
  </div>
</form>
</template>

<script>
// @flow
import Constants from 'src/constants';
import Autocomplete from 'components/autocomplete';

export default {
  components: {
    Autocomplete
  },

  data() {
    return {
      value: {}
    };
  },

  props: {
    location: {
      type: Object,
      required: false
    },
  },

  watch: {
    location: 'refresh',
    warehouseId: 'refresh',
  },

  computed: {
    warehouses() {
      return this.$store.getters.warehouses;
    },
    warehouseId() {
      return this.value.warehouseId;
    },
    warehouse() {
      return this.$store.getters.warehouse(this.warehouseId);
    },
  },

  mounted() {
    this.$store.dispatch(Constants.GET_WAREHOUSES, {
      skip: 0,
      take: 1000
    });
  },

  methods: {
    refresh() {
      if (this.location) {
        this.value = Object.assign({}, this.value, this.location);
        this.validate();
      }
      if (this.warehouseId) {
        this.$store.dispatch(Constants.GET_WAREHOUSE, {
          id: this.warehouseId,
          includeDeleted: true,
        });
      }
    },
    change() {
      return this.validate();
    },
    validate() {
      return this.$validator
        .validateAll()
        .then((isValid) => {
          return {
            isValid,
            location: this.value,
          };
        });
    },
    setWarehouse(v: Object) {
      this.value.warehouseId = v.id;
    },
  }
};
</script>
