<style lang="css" scoped>
</style>
<template>
  <div class="animated fadeIn">
    <form id="warehouse-edit-form" @submit.prevent="save">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              Edit Warehouses
              <div class="card-actions">
                <router-link class="btn" :to="{path: '/warehouses'}">Back to Warehouses</router-link>
                <button type="button" class="btn btn-danger" @click="deleteConfirm" v-can-delete-warehouses>Delete</button>
                <button class="btn" type="submit">Save Warehouse</button>
              </div>
            </div>
            <div class="card-block">
              <div class="form-group" :class="{'has-danger': errors.has('warehouseName')}">
                <label class="form-control-label">Name</label>
                <input type="text" class="form-control" placeholder="Name" name="warehouseName" v-model="warehouse.name" v-validate="'required'" :class="{ 'form-control-danger': errors.has('warehouseName') }">
                <span v-show="errors.has('warehouseName')" class="form-control-feedback">{{ errors.first('warehouseName') }}</span>
              </div>
            </div>
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
