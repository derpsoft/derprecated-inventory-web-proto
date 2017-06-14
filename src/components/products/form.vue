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
    <div class="media">
      <div class="media-body">
        <div class="form-group" :class="{'has-danger': errors.has('productTitle')}">
          <label class="form-control-label">Product Title</label>
          <input type="text" class="form-control" placeholder="Enter a title..." name="productTitle" v-model="value.title" v-validate="'required'" :class="{'form-control-danger': errors.has('productTitle') }">
          <span v-show="errors.has('productTitle')" class="form-control-feedback">Product Title is required.</span>
        </div>
        <div class="form-group">
          <label>Product Description</label>
          <textarea class="form-control" placeholder="Enter a description..." v-model="value.description"></textarea>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        Specifications
      </div>
      <div class="card-block">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Category</label>
              <autocomplete :suggestions="categories" :selected="category" :key-selector="(v) => `${v.name}`" :value-selector="(v) => v" :display-selector="(v) => `${v.id}: ${v.name}`" @change="setCategory">
              </autocomplete>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Tags</label>
              <!--<tag-input :tags="tags"></tag-input>-->
              <autocomplete-multiple :suggestions="vendors" :selected="vendor" :key-selector="(v) => `${v.name}`" :value-selector="(v) => v" :display-selector="(v) => `${v.id}: ${v.name}`" @change="setVendor" placeholder="Add a tag"></autocomplete-multiple>
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
  </form>
</template>

<script>
import _ from 'lodash';
import Constants from 'src/constants';
import Autocomplete from 'components/autocomplete';
import AutocompleteMultiple from 'components/autocomplete-multiple';
// import TagInput from 'components/taginput';

export default {
  name: 'productForm',

  components: {
    Autocomplete,
    AutocompleteMultiple,
    // TagInput,
  },

  data() {
    return {
      toggle: false,
      value: {},
      displayImage: {},
      tags: ['Test', 'Apple', 'Orange', 'Grape']
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
    setVendor(v: Object) {
      this.value.vendorId = v.id;
    },
    setCategory(v: Object) {
      this.value.categoryId = v.id;
    },
  },
};
</script>
