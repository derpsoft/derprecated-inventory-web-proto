<template>
<form>
  <div class="form-group" :class="{'has-danger': errors.has('name')}">
    <label class="form-control-label">Name</label>
    <input type="text" class="form-control" placeholder="Vendor Name" name="name" v-model="value.name" v-validate="'required'" :class="{'form-control-danger': errors.has('name') }">
    <span v-show="errors.has('name')" class="form-control-feedback">{{ errors.first('name') }}</span>
  </div>
  <div class="form-group" :class="{'has-danger': errors.has('contactName')}">
    <label class="form-control-label">Contact Name</label>
    <input type="text" class="form-control" placeholder="Contact Name" name="contactName" v-model="value.contactName" v-validate="'required'" :class="{'form-control-danger': errors.has('contactName') }">
    <span v-show="errors.has('contactName')" class="form-control-feedback">{{ errors.first('contactName') }}</span>
  </div>
  <div class="form-group" :class="{'has-danger': errors.has('contactEmail')}">
    <label class="form-control-label">Contact Email</label>
    <input type="email" class="form-control" placeholder="Contact Email" name="contactEmail" v-model="value.contactEmail" v-validate="'required|email'" :class="{'form-control-danger': errors.has('contactAddress') }">
    <span v-show="errors.has('contactEmail')" class="form-control-feedback">{{ errors.first('contactEmail') }}</span>
  </div>
  <div class="form-group" :class="{'has-danger': errors.has('contactAddress')}">
    <label class="form-control-label">Contact Address</label>
    <textarea class="form-control" name="contactAddress" placeholder="Contact Address" v-model="value.contactAddress" v-validate="'required'"></textarea>
    <span v-show="errors.has('contactAddress')" class="form-control-feedback">{{ errors.first('contactAddress') }}</span>
  </div>
  <div class="form-group" :class="{'has-danger': errors.has('contactPhone')}">
    <label class="form-control-label">Contact Phone</label>
    <input type="tel" class="form-control" placeholder="Contact Phone" name="contactPhone" v-model="value.contactPhone" v-validate="'required'" :class="{'form-control-danger': errors.has('contactPhone') }">
    <span v-show="errors.has('contactPhone')" class="form-control-feedback">{{ errors.first('contactPhone') }}</span>
  </div>
</form>
</template>

<script>
import Constants from 'src/constants';

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
