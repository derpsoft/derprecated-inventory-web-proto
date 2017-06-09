<style lang="css" scoped>
  .empty {
      line-height: 600px;
      display: block;
      text-align: center;
      font-size: 50px;
      color: rgba(102, 102, 102, 0.3);
  }

</style>

<template>
  <div class="card">
    <div class="card-header">
      Bulk Import Products
      <div class="card-actions">
        <a class="btn btn-info" href="/static/docs/product-import-template.csv">Download CSV Template</a>
        <button type="submit" class="btn btn-warning" @click="save" v-if="hasUpload" v-can-upsert-products>Import Products</button>
      </div>
    </div>
    <div class="card-block">

      <div class="card">
        <div class="card-header">
          Table

          <div class="card-actions">
            <csv-import ref="csvImport" :transform="csvToProduct" @done="bulkImport"></csv-import>
          </div>
        </div>
        <div class="card-block">
          Note:
          <span>{{products.length - tableData.length}} product(s) were excluded because they reference a SKU that already exists in the database.</span>
          <span v-if="!hasUpload">The given CSV does not contain any new products.</span>
          <div id="hands-on-table" class="table">
            <span class="empty">Import CSV...</span>
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
