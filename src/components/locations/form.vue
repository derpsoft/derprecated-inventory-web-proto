<template>
  <form @submit.prevent="validate">
    <div class="form-group" :class="{'has-error': errors.has('name')}">
      <label>Name</label>
      <input type="text" class="form-control" placeholder="Location Name" name="name"
        v-model="value.name"
        v-validate.initial="value.name"
        data-vv-rules="required"
        @change="change">
        <span v-show="errors.has('name')" class="help-block">{{ errors.first('name') }}</span>
    </div>
    <div class="form-group">
      <label>Warehouse</label>

      <autocomplete
        :suggestions="warehouses"
        :key-selector="(v) => `${v.name}`"
        :value-selector="(v) => v"
        :display-selector="(v) => `${v.id}: ${v.name}`"
        @change="setWarehouse"
        ></autocomplete>
    </div>
  </form>
</template>

<script>
import Constants from '../../constants';
import Autocomplete from '../autocomplete.vue';

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
    location: 'refresh'
  },

  computed: {
    warehouses() {
      return this.$store.getters.warehouseList;
    }
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
    },
    change() {
      this.validate()
        .then((isValid) => {
          if (isValid) {
            this.$emit('change', this.value);
          }
        });
    },
    validate() {
      return this.$validator
        .validateAll();
    },
    setWarehouse(v) {
      this.value.warehouseId = v.id;
    },
  }
};
</script>
