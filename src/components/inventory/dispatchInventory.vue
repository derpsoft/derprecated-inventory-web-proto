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

                <autocomplete :suggestions="products" :key-selector="(v) => v.title" @change="setProductId"></autocomplete>
              </div>

              <div class="form-group">
                <label>Quantity</label>
                <input type="text" class="form-control" placeholder="Quantity" v-model="quantity">
              </div>

              <div class="form-group">
                <label>Location</label>
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
        quantity: -Math.abs(this.quantity),
        productId: this.productId,
        locationId: this.locationId,
      };
      store.dispatch(Constants.DISPATCH_INVENTORY, xact);
    },
    setProductId(selected) {
      this.productId = selected;
    },
  },
};
</script>
