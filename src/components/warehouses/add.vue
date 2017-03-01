<template>
<div>
  <form id="warehouse-add-form" @submit.prevent="save">
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
