<style lang="css" scoped>
  .empty {
      line-height: 600px;
      display: block;
      text-align: center;
      font-size: 50px;
      color: rgba(255, 255, 255, 0.3);
  }
.table {
    margin: 20px 0;
}
</style>

<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Bulk Receive Inventory
            <div class="card-actions">
            <router-link class="btn btn-w-md btn-accent btn-return" :to="{path: '/inventory'}">Back to Inventory</router-link>
              <a class="btn btn-info" href="/static/docs/inventory-receive-import-template.csv">Download CSV Template</a>
              <button type="submit" class="btn btn-warning" @click="save" v-if="hasUpload" v-can-receive-inventory>Import Inventory</button>
            </div>
          </div>
          <div class="card-block">
            <csv-import ref="csvImport" :transform="csvToTransaction" @done="bulkImport"></csv-import>
          </div>

          <div class="card-block">
            <div class="col-md-12" v-show="importIsFiltered">
              Note:

              <span>{{inventory.length - tableData.length}} rows(s) were excluded because they reference a SKU that does not exist in the database.</span>

              <span v-if="!hasUpload">The given CSV does not contain references to any existing products.</span>
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

</template>

<script>
// @flow
import _ from 'lodash';
import Handsontable from 'handsontable/dist/handsontable.full';
// $FlowFixMe
import 'handsontable/dist/handsontable.min.css';
import Constants from 'src/constants';
import CsvImport from 'components/csvUpload';

export default {
  components: {
    CsvImport,
  },

  data() {
    return {
      inventory: [],
      hot: null,
    };
  },

  computed: {
    columns() {
      return [{
        data: 'sku',
        type: 'text',
        width: 100,
        validate: (v: string[], cb: Function) => {
          cb(v.length > 0 && v.length < 200);
        },
      }, {
        data: 'quantity',
        type: 'numeric',
        format: '0',
        width: 100,
        validate: (v: number, cb: Function) => {
          cb(v > 0);
        },
      }];
    },
    headers() {
      return [
        'sku',
        'quantity',
      ];
    },

    table() {
      return document.querySelector('#hands-on-table');
    },

    error(id: number) {
      return this.$getters.inventoryErrors[id];
    },

    location() {
      return _.find(this.$store.getters.locations, {
        name: 'Receiving'
      });
    },

    tableData() {
      return _.filter(
        this.inventory,
        x => this.$store.getters.productBySku(x.sku)
      );
    },

    importIsFiltered() {
      return this.tableData.length !== this.inventory.length;
    },

    hasUpload() {
      return this.inventory.length && this.tableData.length;
    },
  },

  watch: {
    tableData: 'redrawTable',
  },

  mounted() {
    this.reset();
    // $FlowFixMe
    this.$store.dispatch(Constants.GET_LOCATIONS, {
      take: 1000
    });
    // $FlowFixMe
    this.$store.dispatch(Constants.GET_PRODUCTS, {
      skip: 0,
      take: 1000,
      includeDeleted: true
    });
  },

  methods: {
    reset() {
      // $FlowFixMe
      this.$store.dispatch(Constants.CLEAR_INVENTORY_ERRORS);
    },

    csvToTransaction(csv: Object) {
      return {
        sku: csv['Variant SKU'],
        quantity: parseInt(csv['Variant Inventory Qty'], 10),
      };
    },

    bulkImport(value: Object) {
      this.inventory = JSON.parse(JSON.stringify(value));
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
      const transactions = this.hot.getSourceData();
      // $FlowFixMe
      this.$store.dispatch(Constants.RECEIVE_INVENTORY_BULK, {
        transactions,
        locationId: this.location.id,
        toastError: false,
        redirect: this.redirect
      });
    },

    redirect() {
      this.$router.replace('/inventory');
    },
  },
};
</script>
