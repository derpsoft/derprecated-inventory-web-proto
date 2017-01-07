<template>
<section class="content">
  <div class="container-fluid">
    <form id="receive-inventory-form" @submit.prevent="validate">
      <div class="row control-row">
        <div class="col-md-12">
          <button type="submit" class="btn btn-primary pull-right">Receive</button>
          <h4>Receive Inventory</h4>
        </div>
      </div>
      <div class="panel panel-filled panel-main">
        <div class="panel-body">
          <div class="media">
            <div class="form-group">
              <label>Product</label>
              <autocomplete :suggestions="products" :key-selector="(v) => `${v.sku} ${v.title} ${v.description} ${v.color}`" :display-selector="(v) => `${v.sku}: ${v.title}`" @change="setProductId">
              </autocomplete>
            </div>

            <div class="form-group" :class="{'has-error': errors.has('quantity')}">
              <label>Quantity</label>
              <input type="number" name="quantity" class="form-control" placeholder="Quantity" v-model="quantity" v-validate.initial="quantity" data-vv-rules="required|numeric|between:1, 9999">
              <span v-show="errors.has('quantity')" class="help-block">{{ errors.first('quantity') }}</span>
            </div>

            <div class="form-group" :class="{'has-error': errors.has('location')}">
              <label>Location</label>
              <input type="text" name="location" class="form-control" placeholder="Location" value="Receiving" disabled="disabled">
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</section>
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
      productId: 0,
      locationId: 1,
      quantity: 0,
    };
  },
  computed: {
    products() {
      return this.$store.getters.productList;
    }
  },
  mounted() {
    this.$store.dispatch(Constants.GET_PRODUCTS, {
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
      const xact = {
        quantity: this.quantity,
        productId: this.productId,
        locationId: this.locationId,
      };
      this.$store.dispatch(Constants.RECEIVE_INVENTORY, xact);
    },
    setProductId(selected) {
      this.productId = selected;
    }
  },
};
</script>
