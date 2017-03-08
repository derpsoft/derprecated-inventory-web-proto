<template>
<div>
  <form id="warehouse-edit-form" @submit.prevent="save">
    <div class="row control-row">
      <div class="col-md-12">
        <button type="button" class="btn btn-danger" @click="deleteConfirm" v-can-delete-warehouses>Delete</button>
        <button class="btn btn-primary pull-right" type="submit">Save Warehouse</button>
        <h4>Warehouse Details</h4>
      </div>
    </div>
    <div class="panel panel-filled panel-main">
      <div class="panel-body">
        <div class="form-group" :class="{'has-error': errors.has('warehouseName')}">
          <label>Name</label>
          <input type="text" class="form-control" placeholder="Name" name="warehouseName" v-model="warehouse.name" v-validate="'required'" v-focus="true">
          <span v-show="errors.has('warehouseName')" class="help-block">{{ errors.first('warehouseName') }}</span>
        </div>
      </div>
    </div>
  </form>
</div>
</template>

<script>
import Constants from 'src/constants';

export default {
  name: 'editWarehouse',
  data() {
    return {
      warehouse: {},
    };
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    }
  },
  watch: {
    id: 'load'
  },
  methods: {
    load() {
      this.$store.dispatch(Constants.GET_WAREHOUSE, {
        id: this.id,
      });
    },
    validate() {
      return this.$validator
        .validateAll();
    },
    save() {
      return this.validate()
        .then((isValid) => {
          if (isValid) {
            const warehouse = JSON.parse(JSON.stringify(this.warehouse));
            warehouse.id = this.id;
            this.$store.dispatch(Constants.UPDATE_WAREHOUSE, {
              warehouse
            });
          }
        });
    },
    deleteConfirm() {
      /* eslint-disable no-alert */
      if (window.confirm('Are you sure you want to delete?')) {
        this.delete();
      }
      /* eslint-enable no-alert */
    },

    delete() {
      this.$store.dispatch(Constants.DELETE_WAREHOUSE, {
        id: this.id,
        rowVersion: this.warehouse.rowVersion,
        redirect: this.redirect,
      });
    },
  },
  mounted() {
    this.$store.watch(
      () => this.$store.getters.warehouse(this.id),
      (current) => {
        this.warehouse = Object.assign({}, this.warehouse, current);
      }
    );
    this.load();
  }
};
</script>
