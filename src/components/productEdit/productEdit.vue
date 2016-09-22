<template>
  <div class="row control-row">
    <div class="col-md-12 text-right">
      <button class="btn btn-primary" v-on:click="save()">Save</button>
    </div>
  </div>
  <div class="panel panel-filled">
      <div class="panel-body">
          <form>
              <div class="row">
                  <div class="col-md-12">
                      <div class="form-group">
                          <label>Product Title</label>
                          <input type="text" class="form-control" placeholder="Enter a title..." v-model="product.title">
                      </div>
                      <div class="form-group">
                          <label>Product Description</label>
                          <textarea class="form-control" placeholder="Enter a description..." v-model="product.description"></textarea
                      </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                      <h5>Product Details</h5>
                  </div>
                  <div class="col-md-12">
                      <div class="tabs-container">
                          <tabs>
                              <tab header="Variants">
                                  <div class="panel-body">
                                    <div class="row" v-for="variant in product.variants">
                                      <div class="col-md-12">
                                        <div class="form-group">
                                          <label>{{ variant.title}}</label>
                                          <input type="text" class="form-control" placeholder="title" v-model="variant.title">
                                        </div>
                                        <div class="form-group">
                                          <label>Price</label>
                                          <input type="text" class="form-control" placeholder="title" v-model="variant.price">
                                        </div>
                                        <div class="form-group">
                                          <label>SKU</label>
                                          <input type="text" class="form-control" placeholder="title" v-model="variant.sku">
                                        </div>
                                        <div class="form-group">
                                          <label>Weight (Unit: {{ variant.weightUnit }})</label>
                                          <input type="text" class="form-control" placeholder="title" v-model="variant.weight">
                                        </div>
                                      </div>
                                  </div>
                                </div>
                              </tab>
                              <tab header="Warehouses">
                                  <div class="panel-body">
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

<style scope>
  textarea {
    resize: none;
    height: 200px;
  }
  .nav-tabs {
    margin-bottom: 0 !important;
  }
  .control-row {
    margin-bottom: 20px;
  }
</style>

<script>
  import Vue from 'vue';
  import API_ROOT from '../../constants/constants.js';
  import { tabset, tab } from 'vue-strap';

  const productEdit = Vue.extend({
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
      save() {
        const self = this;
        const headers = new Headers();
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');

        fetch(`${API_ROOT}products/${this.$route.params.id}`, {
          method: 'PUT',
          mode: 'cors',
          headers,
          body: JSON.stringify({
            products: self.products,
          }),
        })
        .then(res => res.json());
        // .then(json => {
        //   // console.log(json);
        // });
      },
    },
    ready() {
      const self = this;

      if (this.$route.params && this.$route.params.id) {
        const headers = new Headers();
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');

        fetch(`${API_ROOT}products/${this.$route.params.id}`, {
          method: 'GET',
          mode: 'cors',
          headers,
        })
        .then(res => res.json())
        .then(json => {
          self.product = json.product;
        });
      }
    },
  });

  export default Vue.component('product-edit', productEdit);
</script>
