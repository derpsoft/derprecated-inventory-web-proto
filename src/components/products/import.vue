
<template>
<div>
  <div class="row">
    <div class="col-md-12">
      <div>

        <div class="product-title">
          <div class="pull-right product-controls">
            <button type="submit" class="btn btn-primary" @click="save" v-can-upsert-products>Import Products</button>
          </div>
          <h4>Bulk Import Products</h4>
        </div>

        <div class="panel panel-filled panel-main">
          <div class="panel-body">
            <csv-import ref="csvImport" :transform="csvToProduct" @done="bulkImport"></csv-import>

            <table v-show="products.length" class="table table-striped table-hover product-list">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>UPC</th>
                  <th>Title</th>
                  <th>Price (USD)</th>
                  <th>Tags</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in products">
                  <td><input type="text" name="sku" v-model="p.sku"></td>
                  <td><input type="text" name="upc" v-model="p.upc"></td>
                  <td><input type="text" name="title" v-model="p.title"></td>
                  <td>
                    <div class="input-group">
                      <div class="input-group-addon">$</div>
                      <input type="number" class="form-control" name="price" v-model="p.price">
                    </div>
                  </td>
                  <td><input type="text" name="tags" v-model="p.tags"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Constants from '../../constants';
import CsvImport from '../csvUpload.vue';

export default {
  components: {
    CsvImport,
  },

  data() {
    return {
      products: [],
    };
  },

  computed: {},

  methods: {
    csvToProduct(csv) {
      console.log(csv);
      return {
        title: csv.Title,
        sku: csv['Variant SKU'],
        upc: csv.Handle,
        vendor: csv.Vendor,
        price: csv['Variant Price'],
        color: csv.Color,
        tags: csv.Tags,
        description: csv['Body (HTML)'],
      };
    },

    bulkImport(value) {
      this.products = value;
    },

    save() {
      this.$refs.productForm
        .validate()
        .then(({
          isValid,
          product
        }) => {
          if (isValid) {
            product.id = this.id;
            this.$store.dispatch(Constants.UPDATE_PRODUCT, {
              product
            });
          }
        });
    },

    redirect() {
      this.$router.replace('/products');
    },
  },
};
</script>
