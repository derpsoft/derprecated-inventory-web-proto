<template>
  <section class="content">
    <div class="container-fluid">
      <div class="row control-row">
        <div class="col-md-12">
          <button class="btn btn-primary pull-right" @click="save">Save</button>
          <h4>Dispatch Inventory</h4>
        </div>
      </div>
      <div class="panel panel-filled panel-main">
        <div class="panel-body">
          <form>
            <div class="media">
              <div class="form-group">
                <label>Product</label>

                <autocomplete
                  :suggestions="products"
                  :key-selector="(v) => `${v.sku} ${v.title} ${v.description} ${v.color}`"
                  :value-selector="(v) => v"
                  :display-selector="(v) => `${v.sku}: ${v.title}`"
                  @change="setProduct">
                </autocomplete>
              </div>

              <div class="form-group">
                <label>Quantity</label>
                <input type="number" class="form-control" placeholder="Quantity" v-model.number.lazy="quantity">
              </div>

              <div class="form-group">
                <label>Prices</label>
                <template v-for="i in quantity">
                  <input type="text" class="form-control" placeholder="Price" v-model.number.lazy="prices[i-1]">
                </template>
              </div>
              </template>

              <div class="form-group hide">
                <label>From Location</label>
                <input type="text" class="form-control" placeholder="Location" value="Shipping" disabled="disabled">
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Constants from '../../constants';
import store from '../../stores/store';
import Autocomplete from '../autocomplete.vue';

export default {
  components: { Autocomplete },
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
      return store.getters.productList;
    }
  },
  mounted() {
    store.dispatch(Constants.GET_PRODUCTS, { take: 1000 });
  },
  methods: {
    save() {
      const xact = {
        quantity: this.quantity,
        productId: this.product.id,
        locationId: this.locationId,
        prices: JSON.parse(JSON.stringify(this.prices)),
        vendorId: 1,
      };
      store.dispatch(Constants.DISPATCH_INVENTORY, xact);
    },
    setProduct(selected) {
      this.product = selected;
    },
  },
};
</script>
