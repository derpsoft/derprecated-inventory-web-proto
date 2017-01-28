<template>
<form @submit.prevent="validate">
  <div class="form-group" :class="{'has-error': errors.has('name')}">
    <label>Name</label>
    <input type="text" class="form-control" placeholder="Vendor Name" name="name" v-model="value.name" v-validate="'required'">
    <span v-show="errors.has('name')" class="help-block">{{ errors.first('name') }}</span>
  </div>
  <div class="form-group" :class="{'has-error': errors.has('contactName')}">
    <label>Contact Name</label>
    <input type="text" class="form-control" placeholder="Contact Name" name="contactName" v-model="value.contactName" v-validate="'required'">
    <span v-show="errors.has('contactName')" class="help-block">{{ errors.first('contactName') }}</span>
  </div>
  <div class="form-group" :class="{'has-error': errors.has('contactEmail')}">
    <label>Contact Email</label>
    <input type="email" class="form-control" placeholder="Contact Email" name="contactEmail" v-model="value.contactEmail" v-validate="'required|email'">
    <span v-show="errors.has('contactEmail')" class="help-block">{{ errors.first('contactEmail') }}</span>
  </div>
  <div class="form-group" :class="{'has-error': errors.has('contactAddress')}">
    <label>Contact Address</label>
    <textarea class="form-control" name="contactAddress" placeholder="Contact Address" v-model="value.contactAddress" v-validate="'required'"></textarea>
    <span v-show="errors.has('contactAddress')" class="help-block">{{ errors.first('contactAddress') }}</span>
  </div>
  <div class="form-group" :class="{'has-error': errors.has('contactPhone')}">
    <label>Contact Phone</label>
    <input type="tel" class="form-control" placeholder="Contact Phone" name="contactPhone" v-model="value.contactPhone" v-validate="'required'">
    <span v-show="errors.has('contactPhone')" class="help-block">{{ errors.first('contactPhone') }}</span>
  </div>
</form>
</template>

<script>
import Constants from '../../constants';

export default {
  data() {
    return {
      value: {}
    };
  },

  props: {
    id: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  watch: {
    id: 'load',
    vendor: 'refresh',
  },

  computed: {
    vendor() {
      return this.$store.getters.vendor(this.id);
    },
  },

  mounted() {
    this.load();
  },

  methods: {
    load() {
      if (this.id > 0) {
        this.$store.dispatch(Constants.GET_VENDOR, {
          id: this.id,
        });
      }
    },
    refresh() {
      this.value = Object.assign({}, this.value, this.vendor);
      this.validate();
    },
    validate() {
      return this.$validator
        .validateAll()
        .then((isValid) => {
          return {
            isValid,
            vendor: this.value
          };
        });
    },
  }
};
</script>
