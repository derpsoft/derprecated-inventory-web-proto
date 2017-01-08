<template>
<section class="content">
  <div class="container-fluid">
    <form id="dispatch-inventory-form" @submit.prevent="validate">
      <div class="row control-row">
        <div class="col-md-12">
          <button type="submit" class="btn btn-primary pull-right">Dispatch</button>
          <h4>Dispatch Inventory</h4>
        </div>
      </div>
      <div class="panel panel-filled panel-main">
        <div class="panel-body">
          <div class="form-group">
            <label>Product</label>

            <autocomplete :suggestions="products" :key-selector="(v) => `${v.sku} ${v.title} ${v.description} ${v.color}`" :value-selector="(v) => v" :display-selector="(v) => `${v.sku}: ${v.title}`" @change="setProduct">
            </autocomplete>
          </div>

          <div class="form-group" :class="{'has-error': errors.has('quantity')}">
            <label>Quantity</label>
            <input type="number" name="quantity" class="form-control" placeholder="Quantity" v-model.number.lazy="quantity" v-validate.initial="quantity" data-vv-rules="required|numeric|between:1, 9999">
            <span v-show="errors.has('quantity')" class="help-block">{{ errors.first('quantity') }}</span>
          </div>

          <div class="form-group" v-if="quantity > 0">
            <label>Prices</label>
          </div>
          <div class="form-group" v-for="i in quantity" :class="{'has-error': errors.has('prices[' + i-1 +']')}" >
            <input type="text" :name="`prices[${i-1}]`" class="form-control" placeholder="Price" v-model.number.lazy="prices[i-1]"  v-validate.initial="prices[i-1]" data-vv-rules="required">
            <span v-show="errors.has('prices[' + i-1 +']')" class="help-block">{{ errors.first('prices[' + i-1 +']') }}</span>
          </div>
          <div class="form-group hide" :class="{'has-error': errors.has('location')}">
            <label>From Location</label>
            <input type="text" name="location" class="form-control" placeholder="Location" value="Shipping" disabled="disabled">
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
      locationId: 2,
      quantity: 0,
      prices: [],
      product: {},
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
    redirect() {
      this.$router.push({ path: '/inventory' });
    },
    validate() {
      this.$validator.validateAll().then((success) => {
        if (!success) {
          return;
        }
        this.save();
      });
    },
    save() {
      const redirect = this.redirect;
      const xact = {
        quantity: this.quantity,
        productId: this.product.id,
        locationId: this.locationId,
        prices: JSON.parse(JSON.stringify(this.prices)),
        vendorId: 1,
        redirect,
      };
      this.$store.dispatch(Constants.DISPATCH_INVENTORY, xact);
    },
    setProduct(selected) {
      this.product = selected;
    },
  },
};
</script>
