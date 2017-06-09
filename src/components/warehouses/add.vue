<style lang="css" scoped>
</style>
<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Add Warehouses
            <div class="card-actions">
              <router-link class="btn btn-w-md btn-accent btn-return" :to="{path: '/warehouses'}">Back to Warehouses</router-link>
              <button class="btn btn-primary pull-right" type="submit">Create Warehouse</button>
            </div>
          </div>
          <div class="card-block">
            <div class="form-group" :class="{'has-error': errors.has('warehouseName')}">
              <label>Name</label>
              <input type="text" class="form-control" placeholder="Name" name="warehouseName" v-model="warehouse.name" v-validate="'required'" v-focus="true">
              <span v-show="errors.has('warehouseName')" class="help-block">{{ errors.first('warehouseName') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Constants from 'src/constants';

export default {
  data() {
    return {
      warehouse: {},
    };
  },
  methods: {
    redirect() {
      this.$router.push({
        path: '/warehouses'
      });
    },
    validate() {
      return this.$validator
        .validateAll();
    },
    save() {
      this.validate()
        .then((isValid) => {
          if (isValid) {
            const warehouse = JSON.parse(JSON.stringify(this.warehouse));
            const redirect = this.redirect;

            this.$store.dispatch(Constants.CREATE_WAREHOUSE, {
              warehouse,
              redirect,
            });
          }
        });
    }
  }
};
</script>
