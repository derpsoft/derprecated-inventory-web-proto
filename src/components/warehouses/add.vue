<template>
<div>
  <div class="row control-row">
    <div class="col-md-12">
      <button class="btn btn-primary pull-right" @click="save">Save</button>
      <h4>New Warehouse Details</h4>
    </div>
  </div>
  <div class="panel panel-filled panel-main">
    <div class="panel-body">
      <form>
        <div class="media">
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" placeholder="Name" v-model="warehouse.name">
          </div>
        </div>
      </form>
    </div>
  </div>
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
    save() {
      const warehouse = JSON.parse(JSON.stringify(this.warehouse));
      warehouse.id = this.id;
      store.dispatch(Constants.CREATE_WAREHOUSE, {
        warehouse
      });
    }
  }
};
</script>
