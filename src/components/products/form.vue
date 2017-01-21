<template>
<form id="product-form" @submit.prevent="validate">
  <div class="panel panel-filled panel-main">
    <div class="panel-body">
      <div class="media">
        <div class="media-left">
          <a href="#" @click.prevent="">
            <!-- <img class="media-object" :src="displayImage" width="250" height="250"> -->
          </a>
        </div>
        <div class="media-body">
          <div class="form-group" :class="{'has-error': errors.has('productTitle')}">
            <label>Product Title</label>
            <input type="text" class="form-control" placeholder="Enter a title..." name="productTitle"
              v-model="value.title"
              @change="change"
              v-validate.initial="value.title" data-vv-rules="required"
              >
            <span v-show="errors.has('productTitle')" class="help-block">Product Title is required.</span>
          </div>
          <div class="form-group">
            <label>Product Description</label>
            <textarea class="form-control" placeholder="Enter a description..."
              v-model="value.description"
              @change="change"
              ></textarea>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <h5>Gallery</h5>
        </div>
        <image-gallery v-if="value.id > 0" :images="value.images" :upload-url="uploadUrl"></image-gallery>
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
                    <autocomplete
                      :suggestions="categories"
                      :selected="category"
                      :key-selector="(v) => `${v.name}`"
                      :value-selector="(v) => v"
                      :display-selector="(v) => `${v.id}: ${v.name}`"
                      @change="setCategory">
                    </autocomplete>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="qty">Quantity</label>
                    <input type="number" name="qty" class="form-control" id="qty" placeholder="Quantity" tabindex="0"
                      v-model="value.quantity"
                      @change="change"
                      >
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Price (USD)</label>
                    <input type="text" class="form-control" placeholder="Price" tabindex="0"
                      v-model="value.price"
                      @change="change"
                      >
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>SKU</label>
                    <input type="text" class="form-control" placeholder="SKU" tabindex="0"
                      v-model="value.sku"
                      @change="change"
                      >
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Weight (Unit: {{ value.weightUnit }})</label>
                    <input type="number" class="form-control" placeholder="Weight" tabindex="0"
                      v-model="value.weight"
                      @change="change"
                      >
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Vendor</label>
                    <autocomplete
                      :suggestions="vendors"
                      :selected="vendor"
                      :key-selector="(v) => `${v.name}`"
                      :value-selector="(v) => v"
                      :display-selector="(v) => `${v.id}: ${v.name}`"
                      @change="setVendor">
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

<style lang="less" scope>
  .panel-main {
      padding-top: 15px;
  }
  .tabs-container {
      margin-top: 20px;
  }
  textarea.form-control {
      resize: none;
      height: 152px;
  }
  .nav-tabs {
      margin-bottom: 0 !important;
  }
  .control-row {
      margin-bottom: 20px;
  }

  .tab-content {
      margin-top: 1px;
  }
  .tab-pane {
      padding: 10px 15px;
      background-color: rgba(68, 70, 79, 0.5);

      .panel {
          &:first-child {
              margin-top: 4px;
          }
          background-color: transparent;
          border: 1px solid rgba(116, 124, 158, 0.2);

          .panel-filled {
              background-color: transparent;
          }
          .panel-heading {
              background-color: transparent;
              font-weight: bold;
          }
          .panel-body {
              background-color: transparent;
          }
      }
  }
  a.thumbnail {
      border: 2px solid transparent;
      &:hover {
          border-color: #f6a821;
          transition: 300ms ease-in-out;
      }
  }
</style>

<script>
import _ from 'lodash';
import Constants from '../../constants';
import Autocomplete from '../autocomplete.vue';
import ImageGallery from '../images/gallery.vue';
import ProductApi from '../../services/productApi';

export default {
  components: { Autocomplete, ImageGallery },
  data() {
    return {
      value: {},
      displayImage: {},
    };
  },

  props: {
    product: {
      type: Object,
      required: false
    },
  },

  computed: {
    vendors() {
      return this.$store.getters.vendors;
    },
    vendor() {
      return _.find(this.$store.getters.vendors, { id: this.value.vendorId });
    },
    categories() {
      return this.$store.getters.categories;
    },
    category() {
      return _.find(this.$store.getters.categories, { id: this.value.categoryId });
    },
    uploadUrl() {
      return new ProductApi().getImageUploadUrl(this.value.id);
    }
  },
  watch: {
    product: 'refresh'
  },
  mounted() {
    this.$store.dispatch(Constants.GET_VENDORS, {
      skip: 0,
      take: 1000,
    });
    this.$store.dispatch(Constants.GET_CATEGORIES, {
      skip: 0,
      take: 1000,
    });
  },
  methods: {
    refresh() {
      if (this.product) {
        this.value = Object.assign({}, this.value, this.product);
        this.validate();
      }
    },
    change() {
      this.validate()
        .then((isValid) => {
          if (isValid) {
            this.$emit('change', this.value);
          }
        });
    },
    validate() {
      return this.$validator
        .validateAll()
        .then((isValid) => {
          this.$emit('is-valid', isValid);
          return isValid;
        });
    },
    setVendor(v) {
      this.value.vendorId = v.id;
      this.change();
    },
    setCategory(v) {
      this.value.categoryId = v.id;
      this.change();
    }
  }
};
</script>
