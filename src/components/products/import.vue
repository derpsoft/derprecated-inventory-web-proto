<style lang="less" scoped>
.panel-main {
  min-height: 600px;
}
.panel-controls {
  padding: 5px 0 10px 0;
}

.table-wrapper {
  margin: 5px 0px;
  width: 100%;
  height: 100%;
  min-height: 500px;

  .empty {
    line-height: 600px;
    display: block;
    text-align: center;
    font-size: 50px;
    color: rgba(255, 255, 255, 0.3);
  }
}
.table {
  margin: 20px 0;
}
</style>

<template>
<div>
  <div class="row">
    <div class="col-md-12">
      <div class="product-title clearfix">
        <h4>Bulk Import Products</h4>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="panel panel-filled panel-main">
            <div class="panel-body">
              <div class="row panel-controls">
                <div class="col-md-6">
                  <csv-import ref="csvImport" :transform="csvToProduct" @done="bulkImport"></csv-import>
                </div>
                <div class="col-md-6 text-right">
                  <button type="submit" class="btn btn-warning" @click="save" v-if="hasUpload" v-can-upsert-products>Import Products</button>
                </div>
              </div>
              <div class="row bs-example table-wrapper">
                <div class="col-md-12">
                  <div id="hands-on-table" class="table">
                    <span class="empty">Import CSV...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Handsontable from 'handsontable/dist/handsontable.full';
import 'handsontable/dist/handsontable.min.css';
// import Constants from '../../constants';
import CsvImport from '../csvUpload.vue';

export default {
  components: {
    CsvImport,
  },

  data() {
    return {
      products: [],
      hot: null,
      hasUpload: false,
    };
  },

  computed: {},

  methods: {
    csvToProduct(csv) {
      return csv;
      // return {
      //   title: csv.Title,
      //   sku: csv['Variant SKU'],
      //   upc: csv.Handle,
      //   vendor: csv.Vendor,
      //   price: csv['Variant Price'],
      //   color: csv.Color,
      //   tags: csv.Tags,
      //   description: csv['Body (HTML)'],
      // };
    },

    bulkImport(value) {
      const table = document.querySelector('#hands-on-table');
      const data = JSON.parse(JSON.stringify(value));
      // this.products = value;

      this.hot = new Handsontable(
        table, {
          data,
          columns: [{
            data: 'title',
            type: 'text',
            width: 100
          }, {
            data: 'sku',
            type: 'text',
            width: 100
          },
          {
            data: 'upc',
            type: 'text',
            width: 100,
          },
          {
            data: 'vendor',
            type: 'text',
            width: 100,
          },
          {
            data: 'price',
            type: 'numeric',
            format: '0.00',
            width: 100,
          },
          {
            data: 'color',
            type: 'text',
            width: 100,
          },
          {
            data: 'tags',
            type: 'text',
            width: 100,
          },
          {
            data: 'description',
            type: 'text',
            width: 300,
          }
          ],
          width: '100%',
          height: 600,
          // contextMenu: true,
          rowHeaders: true,
          colHeaders: [
            'title',
            'sku',
            'upc',
            'vendor',
            'price',
            'color',
            'tags',
            'description',
          ]
        }
      );

      this.hasUpload = true;
    },
    save() {
      console.log(this.hot.getSourceData());
      //
      // this.$refs.productForm
      //   .validate()
      //   .then(({
      //     isValid,
      //     product
      //   }) => {
      //     if (isValid) {
      //       product.id = this.id;
      //       this.$store.dispatch(Constants.UPDATE_PRODUCT, {
      //         product
      //       });
      //     }
      //   });
    },
    redirect() {
      this.$router.replace('/products');
    },
  },
};
</script>
