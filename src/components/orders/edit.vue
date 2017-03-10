<template>
<div>
  <div class="row control-row">
    <div class="col-md-12">
      <button type="button" class="btn btn-danger" @click="deleteConfirm" v-can-delete-orders>Delete</button>
      <button class="btn btn-primary pull-right" @click="save">Save Order</button>
      <h4>Order Details</h4>
    </div>
  </div>
  <div class="panel panel-filled panel-main">
    <div class="panel-body">
      <order-form ref="orderForm" :id="id"></order-form>
    </div>
  </div>
</div>

</template>

<script>
import Constants from 'src/constants';
import OrderForm from './form';

export default {
  name: 'editOrder',
  components: {
    OrderForm
  },

  data() {
    return {};
  },

  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    },
    order() {
      return this.$store.getters.order(this.id);
    },
  },

  methods: {
    save() {
      this.$refs.orderForm.validate()
        .then(({
          isValid,
          order
        }) => {
          if (isValid) {
            order.id = this.id;
            this.$store.dispatch(Constants.UPDATE_ORDER, {
              order
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
      this.$store.dispatch(Constants.DELETE_ORDER, {
        id: this.id,
        rowVersion: this.order.rowVersion,
        redirect: this.redirect,
      });
    },
  }
};

</script>
