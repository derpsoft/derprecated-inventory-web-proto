<style lang="css" scoped>
.panel-main {
    padding-top: 15px;
}
textarea.form-control {
    resize: none;
    height: 152px;
}
</style>

<template>
<form id="product-form" @submit.prevent="validate">
  <div class="panel panel-filled panel-main">
    <div class="panel-body">

      <div class="media">
        <div class="media-body">
          <div class="form-group" :class="{'has-error': errors.has('productTitle')}">
            <label>Product Title</label>
            <input type="text" class="form-control" placeholder="Enter a title..." name="productTitle" v-model="value.title" v-validate="'required'">
            <span v-show="errors.has('productTitle')" class="help-block">Product Title is required.</span>
          </div>
          <div class="form-group">
            <label>Product Description</label>
            <textarea class="form-control" placeholder="Enter a description..." v-model="value.description"></textarea>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="clearfix">
            <div class="panel panel-filled">
              <div class="panel-heading">
                Specifications
              </div>
              <div class="panel-body">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Categories</label>
                    <autocomplete :suggestions="categories" :selected="category" :key-selector="(v) => `${v.name}`" :value-selector="(v) => v" :display-selector="(v) => `${v.id}: ${v.name}`" @change="setCategory">
                    </autocomplete>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="qty">Quantity</label>
                    <input type="number" name="qty" class="form-control" id="qty" placeholder="Quantity" tabindex="0" v-model="value.quantity">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Price (USD)</label>
                    <input type="text" class="form-control" placeholder="Price" tabindex="0" v-model="value.price">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>SKU</label>
                    <input type="text" class="form-control" placeholder="SKU" tabindex="0" v-model="value.sku">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Weight (Unit: {{ value.weightUnit || 'lb' }})</label>
                    <input type="number" class="form-control" placeholder="Weight" tabindex="0" v-model="value.weight">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Vendor</label>
                    <autocomplete :suggestions="vendors" :selected="vendor" :key-selector="(v) => `${v.name}`" :value-selector="(v) => v" :display-selector="(v) => `${v.id}: ${v.name}`" @change="setVendor">
                    </autocomplete>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</form>
</template>

<script>
import _ from 'lodash';
import Constants from 'src/constants';
import Autocomplete from 'components/autocomplete';

export default {
  name: 'productForm',

  components: {
    Autocomplete,
  },

  data() {
    return {
      toggle: false,
      value: {},
      displayImage: {},
    };
  },

  props: {
    id: {
      type: Number,
      required: false,
    },
  },

  computed: {
    product() {
      return this.$store.getters.product(this.id);
    },
    vendors() {
      return this.$store.getters.vendors;
    },
    vendor() {
      return this.$store.getters.vendor(this.value.vendorId);
    },
    categories() {
      return this.$store.getters.categories;
    },
    category() {
      return _.find(this.$store.getters.categories, {
        id: this.value.categoryId
      });
    },
  },

  watch: {
    product: 'refresh'
  },

  mounted() {
    this.load();
  },

  methods: {
    refresh() {
      if (this.product) {
        this.value = Object.assign({}, this.value, this.product);
      }
    },
    load() {
      this.$store.dispatch(Constants.GET_VENDORS, {
        skip: 0,
        take: 1000,
      });
      this.$store.dispatch(Constants.GET_CATEGORIES, {
        skip: 0,
        take: 1000,
      });
    },
    validate() {
      return this.$validator
        .validateAll()
        .then((isValid) => {
          return {
            isValid,
            product: this.value
          };
        });
    },
    setVendor(v) {
      this.value.vendorId = v.id;
    },
    setCategory(v) {
      this.value.categoryId = v.id;
    },
  },
};
</script>
