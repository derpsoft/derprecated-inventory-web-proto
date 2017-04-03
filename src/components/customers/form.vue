<template>
<form>
  <div class="container-fluid">

    <div class="row">

      <div class="col-sm-12 form-group" :class="{'has-error': !this.disabled && errors.has('name')}">
        <label>Name</label>
        <input type="text" class="form-control" placeholder="Name" name="name" v-model="value.name" v-validate="'required'" :disabled="disabled">
        <span v-show="!this.disabled && errors.has('name')" class="help-block">{{ errors.first('name') }}</span>
      </div>

      <div class="col-sm-8 form-group" :class="{'has-error': !this.disabled && errors.has('email')}">
        <label>Email</label>
        <input type="email" class="form-control" placeholder="Email" name="email" v-model="value.email" v-validate="'required'" :disabled="disabled">
        <span v-show="!this.disabled && errors.has('email')" class="help-block">{{ errors.first('email') }}</span>
      </div>

      <div class="col-sm-4 form-group" :class="{'has-error': !this.disabled && errors.has('phoneNumber')}">
        <label>Phone</label>
        <input type="tel" class="form-control" placeholder="Phone" name="phoneNumber" v-model="value.phoneNumber" v-validate="'required'" :disabled="disabled">
        <span v-show="!this.disabled && errors.has('phoneNumber')" class="help-block">{{ errors.first('phoneNumber') }}</span>
      </div>
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
    customer: {
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
    customer: 'refresh',
  },

  computed: {
    customerPropOrStored() {
      return this.customer || this.$store.getters.customer(this.id);
    },
  },

  mounted() {
    this.load();
  },

  methods: {
    load() {
      if (this.id > 0) {
        this.$store.dispatch(Constants.GET_CUSTOMER, {
          id: this.id,
        });
      }
    },
    refresh() {
      this.value = Object.assign({}, this.value, this.customerPropOrStored);
    },
    validate() {
      return this.$validator
        .validateAll()
        .then((isValid) => {
          return {
            isValid: this.disabled || isValid,
            customer: this.value
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
