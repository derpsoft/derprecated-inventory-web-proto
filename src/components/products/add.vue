<template>
<div>
  <form id="product-add-form" @submit.prevent="validate">
    <div class="row control-row">
      <div class="col-md-12">
        <button class="btn btn-primary pull-right" type="submit">Create Product</button>
        <h4>Product Details</h4>
      </div>
    </div>
    <div class="panel panel-filled panel-main">
      <div class="panel-body">
        <div class="media">
          <div class="media-left">
            <a href="#" @click.prevent="">
              <img class="media-object" width="250" height="250" src="http://placehold.it/250x250" v-if="!product.images">
            </a>
          </div>
          <div class="media-body">
            <div class="form-group" :class="{'has-error': errors.has('productTitle')}">
              <label>Product Title</label>
              <input type="text" class="form-control" placeholder="Enter a title..." v-model="product.title" name="productTitle" v-validate.initial="productTitle" data-vv-rules="required">
              <span v-show="errors.has('productTitle')" class="help-block">Product Title is required.</span>
            </div>
            <div class="form-group">
              <label>Product Description</label>
              <textarea class="form-control" placeholder="Enter a description..." v-model="product.description"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="form-group">
              <label>Categories</label>
              <input type="text" class="form-control" placeholder="Categories" tabindex="0" v-model="product.tags">
            </div>
            <div class="form-group">
              <label for="qty">Quantity</label>
              <input type="number" name="qty" class="form-control" id="qty" placeholder="Quantity" tabindex="0" v-model="product.quantity">
            </div>
            <div class="form-group">
              <label>Price (USD)</label>
              <input type="text" class="form-control" placeholder="Price" v-model="product.price" tabindex="0">
            </div>
            <div class="form-group">
              <label>SKU</label>
              <input type="text" class="form-control" placeholder="SKU" v-model="product.sku" tabindex="0">
            </div>
            <div class="form-group">
              <label>Weight (Unit: {{ product.weightUnit }})</label>
              <input type="number" class="form-control" placeholder="Weight" v-model="product.weight" tabindex="0">
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

export default {
  name: 'productsAdd',
  data() {
    return {
      product: {},
    };
  },
  components: {
    tabs: tabset,
    tab,
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
      const product = JSON.parse(JSON.stringify(this.product));
      this.$store.dispatch(Constants.SAVE_PRODUCT, {
        product
      });
    },
  },
};
</script>
