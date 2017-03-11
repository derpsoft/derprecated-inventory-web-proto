<template>
<form>
  <div class="container-fluid">

    <div class="row">

      <div class="col-sm-12 form-group" :class="{'has-error': errors.has('name')}">
        <label>Name</label>
        <input type="text" class="form-control" placeholder="Name" name="name" v-model="value.name"
            v-validate="'required'">
          <span v-show="errors.has('name')" class="help-block">{{ errors.first('name') }}</span>
      </div>

      <div class="col-sm-8 form-group" :class="{'has-error': errors.has('email')}">
        <label>Email</label>
        <input type="email" class="form-control" placeholder="Email" name="email" v-model="value.email"
            v-validate="'required'">
          <span v-show="errors.has('email')" class="help-block">{{ errors.first('email') }}</span>
      </div>

      <div class="col-sm-4 form-group" :class="{'has-error': errors.has('phone')}">
        <label>Phone</label>
        <input type="tel" class="form-control" placeholder="Phone" name="phone" v-model="value.phone"
            v-validate="'required'">
          <span v-show="errors.has('phone')" class="help-block">{{ errors.first('phone') }}</span>
      </div>

      <div class="col-sm-12 form-group" :class="{'has-error': errors.has('line1')}">
        <label>Address</label>
        <input type="text" class="form-control" placeholder="Line 1" name="line1" v-model="value.line1"
            v-validate="'required'">
          <span v-show="errors.has('line1')" class="help-block">{{ errors.first('line1') }}</span>
      </div>

      <div class="col-sm-12 form-group" :class="{'has-error': errors.has('line2')}">
        <input type="text" class="form-control" placeholder="Line 2" name="line2" v-model="value.line2"
            v-validate="'required'">
      </div>

      <div class="col-sm-7 form-group" :class="{'has-error': errors.has('city')}">
        <label>City</label>
        <input type="text" class="form-control" placeholder="City" name="city" v-model="value.city"
            v-validate="'required'">
          <span v-show="errors.has('city')" class="help-block">{{ errors.first('city') }}</span>
      </div>

      <div class="col-sm-2 form-group" :class="{'has-error': errors.has('state')}">
        <label>State</label>
        <input type="text" class="form-control" placeholder="State" name="state" v-model="value.state"
            v-validate="'required'">
          <span v-show="errors.has('state')" class="help-block">{{ errors.first('state') }}</span>
      </div>

      <div class="col-sm-3 form-group" :class="{'has-error': errors.has('zipcode')}">
        <label>Zip</label>
        <input type="tel" class="form-control" placeholder="Zip" name="zipcode" v-model="value.zipcode"
            v-validate="'required'">
          <span v-show="errors.has('zipcode')" class="help-block">{{ errors.first('zipcode') }}</span>
      </div>
    </div>
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
    }
  },

  watch: {
    id: 'load',
    customer: 'refresh',
  },

  computed: {
    customer() {
      return this.$store.getters.customer(this.id);
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
      this.value = Object.assign({}, this.value, this.customer);
    },
    validate() {
      return this.$validator
        .validateAll()
        .then((isValid) => {
          return {
            isValid,
            customer: this.value
          };
        });
    },
  }
};

</script>
