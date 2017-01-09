<template>
<div>
  <form id="warehouse-add-form" @submit.prevent="validate">
    <div class="row control-row">
      <div class="col-md-12">
        <button class="btn btn-primary pull-right" type="submit">Create Warehouse</button>
        <h4>Warehouse Details</h4>
      </div>
    </div>
    <div class="panel panel-filled panel-main">
      <div class="panel-body">
        <div class="form-group" :class="{'has-error': errors.has('warehouseName')}">
          <label>Name</label>
          <input type="text" class="form-control" placeholder="Name" name="warehouseName" v-model="warehouse.name" v-validate.initial="warehouse.name" data-vv-rules="required">
          <span v-show="errors.has('warehouseName')" class="help-block">{{ errors.first('warehouseName') }}</span>
        </div>
      </div>
    </div>
  </form>
</div>
</template>

<script>
import Constants from '../../constants';
import store from '../../stores/store';

export default {
  data() {
    return {
      warehouse: {},
    };
  },
  methods: {
    redirect() {
      this.$router.push({ path: '/warehouses' });
    },
    validate() {
      this.$validator.validateAll().then((success) => {
        if (!success) {
          return;
        }
        this.save();
      });
    },
    save() {
      const warehouse = JSON.parse(JSON.stringify(this.warehouse));
      const redirect = this.redirect;

      warehouse.id = this.id;
      store.dispatch(Constants.CREATE_WAREHOUSE, {
        warehouse,
        redirect,
      });
    }
  }
};
</script>
