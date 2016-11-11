<template>
  <div class="row control-row">
    <div class="col-md-12">
      <!-- <button class="btn btn-primary pull-right" v-on:click="save()">Save</button> -->
      <h4>Product Details</h4>
    </div>
  </div>
  <div class="panel panel-filled panel-main">
    <div class="panel-body">
      <form>
        <div class="media">
          <div class="media-left">
            <a href="#" @on:click.prevent="">
            <img class="media-object" :src="displayImage || product.images[0].source" width="250" height="250" src="http://placehold.it/250x250" v-if="product.images">
            <img class="media-object" width="250" height="250" src="http://placehold.it/250x250" v-if="!product.images">
            </a>
          </div>
          <div class="media-body">
            <div class="form-group">
              <label>Product Title</label>
              <input type="text" class="form-control" placeholder="Enter a title..." v-model="product.title">
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
             <a class="thumbnail" href="#" v-on:click.prevent="updateImage(image.source)">
               <img class="img-responsive" :src="image.source" alt="">
             </a>
           </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Categories</label>
              <input type="text" class="form-control" placeholder="Categories" tabindex="0">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
          </div>
          <div class="col-md-12">
            <div class="tabs-container">
              <tabs>
                <tab header="Variants">
                  <div class="clearfix">
                    <div class="panel panel-filled" v-for="variant in product.variants">
                      <div class="panel-heading">
                        {{variant.title}}
                      </div>
                      <div class="panel-body">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Price (USD)</label>
                            <input type="text" class="form-control" placeholder="Price" v-model="variant.price">
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>SKU</label>
                            <input type="text" class="form-control" placeholder="SKU" v-model="variant.sku">
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Weight (Unit: {{ variant.weightUnit }})</label>
                            <input type="text" class="form-control" placeholder="Weight" v-model="variant.weight">
                          </div>
                        </div>
                      </div>
                    </div>
                    <button class="btn btn-accent pull-right" v-on:click.prevent="addVariant()">Add Variant</button>
                  </div>
                </tab>
              </tabs>
            </div>
          </div>
        </div>
      </form>
    </div>
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
      background-color: transparent;;
      border: 1px solid rgba(116, 124, 158, 0.2);

      .panel-filled {
        background-color: transparent;;
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
  import Vue from 'vue';
  import Constants from '../../constants';
  import store from '../../stores/store';
  import { tabset, tab } from 'vue-strap';

  const productEdit = Vue.extend({
    data() {
      return {
        product: {},
        displayImage: null,
      };
    },
    components: {
      tabs: tabset,
      tab,
    },
    computed: {
      product: () => {
        return store.state.products.product;
      }
    },
    methods: {
      save() {
        // const self = this;
        // const headers = new Headers();
        // headers.set('Accept', 'application/json');
        // headers.set('Content-Type', 'application/json');
        //
        // fetch(`${Constants.API_ROOT}/api/v1/products/${this.$route.params.id}`, {
        //   method: 'PUT',
        //   mode: 'cors',
        //   headers,
        //   body: JSON.stringify({
        //     products: self.products,
        //   }),
        // })
        // .then(res => res.json());
        // // .then(json => {
        // //   // console.log(json);
        // // });
      },
      addVariant() {
        this.product.variants.push({
          weightUnit: 'lb',
        });
      },
      updateImage(img) {
        this.displayImage = img;
      },
    },
    ready() {
      if (this.$route.params && this.$route.params.id) {
        this.$store.dispatch(Constants.GET_PRODUCT, {
          id: this.$route.params.id,
        });
      }
    },
  });

  export default Vue.component('product-edit', productEdit);
</script>
