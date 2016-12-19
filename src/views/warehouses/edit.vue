<template>
<section class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="view-header">
                    <div class="pull-right">
                        <button class="btn btn-w-md btn-accent btn-return" v-link="{path: '/warehouses'}">Back to Warehouses</button>
                    </div>
                    <div class="header-icon">
                        <i class="pe page-header-icon pe-7s-plus"></i>
                    </div>
                    <div class="header-title">
                        <h3>Edit Warehouse</h3>
                        <small>Make modifications</small>
                    </div>
                </div>
                <hr>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
              <warehouse-edit></warehouse-edit>
            </div>
        </div>
    </div>
</section>
</template>
<script>
  import WarehouseEdit from '../../components/warehouses/edit.vue';
  export default {
    data() {
      return {
      };
    },
    components: {
      WarehouseEdit,
    },
    created() {
    },
  };
</script>

<style scope>
  .btn-return {
    margin-right: -15px;
  }
</style>
