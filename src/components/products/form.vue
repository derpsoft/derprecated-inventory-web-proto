<template>
<div>
  <div class="product-title">
    <div class="pull-right product-controls">
      <button type="button" class="btn btn-warning" @click="onToggle" v-if="images.length > 0">Toggle Upload</button>
      <button class="btn btn-primary" type="submit">Save Product</button>
    </div>
    <h4>{{ value.title || 'Untitled' }}</h4>
  </div>
  <form id="product-form" @submit.prevent="validate">
    <div class="panel panel-filled panel-main">
      <div class="panel-body">
        <div class="row" is-dev>
          <div class="col-lg-12">
            <image-gallery is-dev v-if="id > 0" :images="images" :upload-url="uploadUrl" :on-sending="xhrIntercept" :on-delete="deleteImage" :toggle="toggle"></image-gallery>
          </div>
        </div>
        <div class="media">
          <div class="media-body">
            <div class="form-group" :class="{'has-error': errors.has('productTitle')}">
              <label>Product Title</label>
              <input type="text" class="form-control" placeholder="Enter a title..." name="productTitle" v-model="value.title" v-validate.initial="value.title" data-vv-rules="required">
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
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <button class="delete-btn btn btn-danger pull-right" v-can-delete-products>Delete Product</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>
</template>

<style lang="less" scoped>
.dz-image {
  img {
    margin: 0 auto;
  }
}
.delete-btn {
    width: 100%;
}
.product-title {
    margin-bottom: 25px;
}
.product-controls {
    margin-top: -8px;
    button {
        margin-left: 10px;
    }
}
.panel-main {
    padding-top: 15px;
}
textarea.form-control {
    resize: none;
    height: 152px;
}
.control-row {
    margin-bottom: 20px;
}
</style>

<script>
import _ from 'lodash';
import Constants from '../../constants';
import Autocomplete from '../autocomplete.vue';
import ImageGallery from '../images/gallery.vue';
import ProductApi from '../../services/productApi';

export default {
  name: 'productForm',
  components: {
    Autocomplete,
    ImageGallery
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
      default: 0,
    },
  },

  computed: {
    product() {
      return this.$store.getters.product(this.id);
    },
    images() {
      return this.$store.getters.productImages(this.id);
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
    uploadUrl() {
      return new ProductApi().getImageUploadUrl(this.id);
    },
  },
  watch: {
    id: 'load',
    product: 'refresh'
  },
  mounted() {
    this.load();

    this.$watch('images', function(newVal) {
      if (newVal) {
        this.toggle = true;
      }
    });
  },
  methods: {
    refresh() {
      if (this.product) {
        this.value = Object.assign({}, this.value, this.product);
      }
    },
    load() {
      if (this.id > 0) {
        this.$store.dispatch(Constants.GET_PRODUCT, {
          id: this.id,
        });
      }
      this.$store.dispatch(Constants.GET_VENDORS, {
        skip: 0,
        take: 1000,
      });
      this.$store.dispatch(Constants.GET_CATEGORIES, {
        skip: 0,
        take: 1000,
      });
    },
    onToggle() {
      this.toggle = !this.toggle;
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
    xhrIntercept(file, xhr) {
      return new ProductApi().imageUploadIntercept(file, xhr);
    },
    deleteImage(image) {
      /* eslint-disable no-alert */
      if (window.confirm('Are you sure you want to delete?')) {
        this.$store.dispatch(Constants.DELETE_PRODUCT_IMAGE, {
          id: image.id,
          productId: this.id
        });
      }
      /* eslint-enable no-alert */
    },
    save() {
      this.$validator
        .validate()
        .then(({
          isValid,
          product
        }) => {
          if (isValid) {
            product.id = this.id;
            this.$store.dispatch(Constants.SAVE_PRODUCT, {
              product
            });
          }
        });
    },
    onConfirmRemove() {
      this.$store.dispatch(Constants.DELETE_PRODUCT, this.id);
    },
    remove() {
      /* eslint-disable no-alert */
      if (window.confirm('Are you sure you want to delete?')) {
        this.onConfirmRemove();
      }
      /* eslint-enable no-alert */
    },
  }
};
</script>
