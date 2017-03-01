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
        <h4>Bulk Receive Inventory</h4>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="panel panel-filled panel-main">
            <div class="panel-body">
              <div class="row panel-controls">
                <div class="col-md-6">
                  <csv-import ref="csvImport" :transform="csvToTransaction" @done="bulkImport"></csv-import>
                </div>
                <div class="col-md-6 text-right">
                  <a class="btn btn-info" href="/static/docs/inventory-receive-import-template.csv">Download CSV Template</a>
                  <button type="submit" class="btn btn-warning" @click="save" v-if="hasUpload" v-can-receive-inventory>Import Inventory</button>
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
      inventory: [],
      hot: null,
      hasUpload: false,
    };
  },

  computed: {
    columns() {
      return [{
        data: 'sku',
        type: 'text',
        width: 100
      }, {
        data: 'quantity',
        type: 'numeric',
        format: '0',
        width: 100,
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

    error(id) {
      return this.$getters.inventoryErrors[id];
    },

    location() {
      return _.find(this.$store.getters.locations, {
        name: 'Receiving'
      });
    },
  },

  mounted() {
    this.reset();
    this.$store.dispatch(Constants.GET_LOCATIONS, {
      take: 1000
    });
  },

  methods: {
    reset() {
      this.$store.dispatch(Constants.CLEAR_INVENTORY_ERRORS);
    },

    csvToTransaction(csv) {
      return {
        _id: Symbol(csv['Variant SKU']),
        sku: csv['Variant SKU'],
        quantity: parseInt(csv['Variant Inventory Qty'], 10),
      };
    },

    bulkImport(value) {
      const data = JSON.parse(JSON.stringify(value));

      this.hasUpload = true;
      this.hot = new Handsontable(
        this.table, {
          data,
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
