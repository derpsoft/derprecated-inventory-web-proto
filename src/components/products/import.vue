<style lang="css" scoped>
.panel-main {
    min-height: 600px;
}
.panel-controls {
    padding: 5px 0 10px;
}

.table-wrapper {
    margin: 5px 0;
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
                  <a class="btn btn-info" href="/static/docs/product-import-template.csv">Download CSV Template</a>
                  <button type="submit" class="btn btn-warning" @click="save" v-if="hasUpload" v-can-upsert-products>Import Products</button>
                </div>
              </div>
              <div class="row bs-example table-wrapper">
                <div class="col-md-12" v-show="importIsFiltered">
                  Note:

                  <span>{{products.length - tableData.length}} product(s) were excluded because they reference a SKU that already exists in the database.</span>

                  <span v-if="!hasUpload">The given CSV does not contain any new products.</span>
                </div>
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
import _ from 'lodash';
import Handsontable from 'handsontable/dist/handsontable.full';
import 'handsontable/dist/handsontable.min.css';
import Constants from 'src/constants';
import CsvImport from 'components/csvUpload';

export default {
  components: {
    CsvImport,
  },

  data() {
    return {
      products: [],
      hot: null,
    };
  },

  computed: {
    columns() {
      return [{
        data: 'title',
        type: 'text',
        width: 100,
        validator: (v, cb) => {
          cb(v.length > 0 && v.length < 500);
        },
      }, {
        data: 'sku',
        type: 'text',
        width: 100,
      }, {
        data: 'upc',
        type: 'text',
        width: 100,
      }, {
        data: 'vendor',
        type: 'text',
        width: 100,
      }, {
        data: 'price',
        type: 'numeric',
        format: '0.00',
        width: 100,
        validator: (v, cb) => {
          cb(v > 0);
        },
      }, {
        data: 'color',
        type: 'text',
        width: 100,
      }, {
        data: 'tags',
        type: 'text',
        width: 100,
      }, {
        data: 'description',
        type: 'text',
        width: 300,
        validator: (v, cb) => {
          cb(v.length < 8000);
        },
      }];
    },
    headers() {
      return [
        'title',
        'sku',
        'upc',
        'vendor',
        'price',
        'color',
        'tags',
        'description',
      ];
    },
    table() {
      return document.querySelector('#hands-on-table');
    },
    tableData() {
      return _.reject(
        this.products,
        x => !!this.$store.getters.productBySku(x.sku)
      );
    },
    importIsFiltered() {
      return this.tableData.length !== this.products.length;
    },
    hasUpload() {
      return this.products.length > 0 && this.tableData.length > 0;
    },
  },

  watch: {
    tableData: 'redrawTable',
  },

  mounted() {
    this.$store.dispatch(Constants.GET_PRODUCTS, {
      skip: 0,
      take: 1000,
      includeDeleted: true
    });
  },

  methods: {
    csvToProduct(csv: Object) {
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

    bulkImport(value: Object) {
      this.products = JSON.parse(JSON.stringify(value));
    },

    redrawTable() {
      this.hot = new Handsontable(
        this.table, {
          data: this.tableData,
          columns: this.columns,
          colHeaders: this.headers,
          width: '100%',
          height: 600,
          allowEmpty: false,
          allowInsertRow: false,
          allowInsertColumn: false,
          allowRemoveColumn: false,
          // contextMenu: true,
          rowHeaders: true,
          rowHeights: 40,
        }
      );
    },

    save() {
      const products = this.hot.getSourceData();
      this.$store.dispatch(Constants.CREATE_PRODUCTS, {
        products,
        toastError: true,
        redirect: this.redirect
      });
    },

    redirect() {
      this.$router.replace('/products');
    },
  },
};
</script>
