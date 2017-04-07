<template>
<form @submit.prevent="validate">
  <div class="form-group">
    <label>Product</label>

    <autocomplete v-focus="true" :suggestions="products" :key-selector="(v) => `${v.sku} ${v.title} ${v.description} ${v.color}`" :value-selector="(v) => v" :display-selector="(v) => `${v.sku}: ${v.title}`" @change="setProduct">
    </autocomplete>
  </div>

  <div class="form-group" :class="{'has-error': errors.has('quantity')}">
    <label>Quantity</label>

    <input type="number" name="quantity" class="form-control" placeholder="Quantity" v-model.number.lazy="value.quantity" v-validate="'required|numeric|between:1, 9999'" data-vv-as="quantity">
    <span v-show="errors.has('quantity')" class="help-block">{{ errors.first('quantity') }}</span>
  </div>

  <div class="form-group" :class="{'has-error': errors.has('total')}">
    <label>Total Price</label>
    <div class="input-group">
      <div class="input-group-addon">$</div>
      <input type="text" name="total" class="form-control" placeholder="Price" v-model.number="value.total" v-validate="'required|decimal:2'" data-vv-as="total price">
    </div>
    <span v-show="errors.has('total')" class="help-block">{{ errors.first('total') }}</span>
  </div>
</form>
</template>

<script>
import Constants from 'src/constants';
import Autocomplete from 'components/autocomplete';

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
    id: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  watch: {
    id: 'load',
    sale: 'refresh',
  },

  computed: {
    sale() {
      return this.$store.getters.sale(this.id);
    },
    products() {
      return this.$store.getters.products;
    },
  },

  mounted() {
    this.load();
  },

  methods: {
    load() {
      if (this.id > 0) {
        this.$store.dispatch(Constants.GET_SALE, {
          id: this.id,
        });
      }
      this.$store.dispatch(Constants.GET_PRODUCTS, {
        skip: 0,
        take: 1000,
      });
    },
    refresh() {
      this.value = Object.assign({}, this.value, this.sale);
      this.validate();
    },
    validate() {
      return this.$validator
        .validateAll()
        .then((isValid) => {
          return {
            isValid,
            sale: this.value
          };
        });
    },
    setProduct(x: Object) {
      this.value.productId = x.id;
      this.value.vendorId = x.vendorId;
    },
  }
};
</script>
