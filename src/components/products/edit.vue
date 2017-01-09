<template>
<div>
  <form id="product-edit-form" @submit.prevent="validate">
    <div class="row control-row">
      <div class="col-md-12">
        <button class="btn btn-primary pull-right" type="submit">Save Product</button>
        <h4>Product Details</h4>
      </div>
    </div>
    <div class="panel panel-filled panel-main">
      <div class="panel-body">
        <div class="media">
          <div class="media-left">
            <a href="#" @click.prevent="">
              <img class="media-object" :src="displayImage" width="250" height="250">
            </a>
          </div>
          <div class="media-body">
            <div class="form-group" :class="{'has-error': errors.has('productTitle')}">
              <label>Product Title</label>
              <input type="text" class="form-control" placeholder="Enter a title..." v-model="product.title" name="productTitle" v-validate.initial="product.title" data-vv-rules="required">
              <span v-show="errors.has('productTitle')" class="help-block">Product Title is required.</span>
            </div>
            <div class="form-group">
              <label>Product Description</label>
              <textarea class="form-control" placeholder="Enter a description..." v-model="product.description"></textarea>
            </div>
          </div>
        </div>
        <div class="row" v-if="product.images">
          <div class="col-lg-12">
            <h5>Gallery</h5>
          </div>
          <div class="col-lg-1 thumb" v-for="image in product.images">
            <a class="thumbnail" href="#" @click.prevent="updateImage(image.source)">
              <img class="img-responsive" :src="image.source" alt="">
            </a>
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
                      <input type="text" class="form-control" placeholder="Categories" tabindex="0" v-model="product.tags">
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="qty">Quantity</label>
                      <input type="number" name="qty" class="form-control" id="qty" placeholder="Quantity" tabindex="0" v-model="product.quantity">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Price (USD)</label>
                      <input type="text" class="form-control" placeholder="Price" v-model="product.price" tabindex="0">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>SKU</label>
                      <input type="text" class="form-control" placeholder="SKU" v-model="product.sku" tabindex="0">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Weight (Unit: {{ product.weightUnit }})</label>
                      <input type="number" class="form-control" placeholder="Weight" v-model="product.weight" tabindex="0">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Vendor</label>
                      <select class="form-control" v-model="product.vendorId">
                        <option v-for="vendor in vendors" :value="vendor.id">{{ vendor.name }}</option>
                      </select>
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
</div>
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
import {
  tabset,
  tab
} from 'vue-strap';
import Constants from '../../constants';
import store from '../../stores/store';

export default {
  name: 'productEdit',
  data() {
    return {
      product: {},
      displayImage: 'http://placehold.it/250x250',
    };
  },
  components: {
    tabs: tabset,
    tab,
  },
  computed: {
    vendors() {
      return store.getters.vendors;
    },
    id() {
      return parseInt(this.$route.params.id, 10);
    }
  },
  methods: {
    save() {
      const product = JSON.parse(JSON.stringify(this.product));
      product.id = this.id;
      store.dispatch(Constants.SAVE_PRODUCT, {
        product
      });
    },
    updateImage(img) {
      this.displayImage = img;
    },
    validate() {
      this.$validator.validateAll().then((success) => {
        if (!success) {
          return;
        }
        this.save();
      });
    },
  },
  mounted() {
    store.watch(() => store.getters.product, (current) => {
      this.product = Object.assign({}, current);
      if (this.product.images && this.product.images[0] && this.product.images[0].source) {
        this.displayImage = this.product.images[0].source;
      }
    });
    store.dispatch(Constants.GET_PRODUCT, {
      id: this.id,
    });
    store.dispatch(Constants.GET_VENDORS, {
      skip: 0,
      take: 1000,
    });
  }
};
</script>
