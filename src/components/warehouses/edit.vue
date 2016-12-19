<template>
<div class="row control-row">
  <div class="col-md-12">
    <button class="btn btn-primary pull-right" @click="save">Save</button>
    <h4>Warehouse Details</h4>
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
  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    }
  },
  watch: {
    $route: 'load'
  },
  methods: {
    load() {
      store.dispatch(Constants.GET_WAREHOUSE, {
        id: this.id,
      });
    },
    save() {
      const warehouse = JSON.parse(JSON.stringify(this.warehouse));
      warehouse.id = this.id;
      store.dispatch(Constants.SAVE_WAREHOUSE, {
        warehouse
      });
    }
  },
  created() {
    store.watch(() => store.getters.warehouse, (current) => {
      this.warehouse = Object.assign({}, current);
    });
    this.load();
  }
};
</script>
