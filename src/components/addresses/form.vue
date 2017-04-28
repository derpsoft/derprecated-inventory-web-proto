<template>
  <form>
    <div class="row">
      <div class="col-sm-12 form-group" :class="{'has-error': !this.disabled && errors.has('line1')}">
        <label>Address</label>
        <input type="text" class="form-control" placeholder="Line 1" name="line1" v-model="value.line1" v-validate="'required'" :disabled="disabled">
        <span v-show="!this.disabled && errors.has('line1')" class="help-block">{{ errors.first('line1') }}</span>
      </div>

      <div class="col-sm-12 form-group" :class="{'has-error': !this.disabled && errors.has('line2')}">
        <input type="text" class="form-control" placeholder="Line 2" name="line2" v-model="value.line2" :disabled="disabled">
      </div>

      <div class="col-sm-7 form-group" :class="{'has-error': !this.disabled && errors.has('city')}">
        <label>City</label>
        <input type="text" class="form-control" placeholder="City" name="city" v-model="value.city" v-validate="'required'" :disabled="disabled">
        <span v-show="!this.disabled && errors.has('city')" class="help-block">{{ errors.first('city') }}</span>
      </div>

      <div class="col-sm-2 form-group" :class="{'has-error': !this.disabled && errors.has('state')}">
        <label>State</label>
        <input type="text" class="form-control" placeholder="State" name="state" v-model="value.state" v-validate="'required'" :disabled="disabled">
        <span v-show="!this.disabled && errors.has('state')" class="help-block">{{ errors.first('state') }}</span>
      </div>

      <div class="col-sm-3 form-group" :class="{'has-error': !this.disabled && errors.has('zip')}">
        <label>Zip</label>
        <input type="tel" class="form-control" placeholder="Zip" name="zip" v-model="value.zip" v-validate="'required'" :disabled="disabled">
        <span v-show="!this.disabled && errors.has('zip')" class="help-block">{{ errors.first('zip') }}</span>
      </div>
    </div>
  </form>
</template>

<script>
// @flow
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
    address: {
      type: Object,
      required: false,
      default: null,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  watch: {
    id: 'load',
    address: 'refresh',
  },

  computed: {
    addressPropOrStored() {
      return this.address || this.$store.getters.customer(this.id);
    },
  },

  mounted() {
    this.load();
  },

  methods: {
    load() {
      if (this.id > 0) {
        // $FlowFixMe
        this.$store.dispatch(Constants.GET_CUSTOMER, {
          id: this.id,
        });
      }
    },
    refresh() {
      this.value = Object.assign({}, this.value, this.addressPropOrStored);
    },
    validate() {
      return this.$validator
        .validateAll()
        .then((isValid) => {
          return {
            isValid: this.disabled || isValid,
            address: this.value
          };
        })
        .catch(() => {
          return {
            isValid: this.disabled,
            address: this.value
          };
        });
    },
  }
};
</script>
