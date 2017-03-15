<template>
<div>
  <div class="row control-row">
    <div class="col-md-12">
      <button class="btn btn-primary pull-right" @click="save">Create Order</button>
      <h4>Order Details</h4>
    </div>
  </div>
  <div class="panel panel-filled panel-main">
    <div class="panel-body">
      <order-form ref="orderForm"></order-form>
    </div>
  </div>
</div>
</template>

<script>
import Constants from 'src/constants';
import OrderForm from './form';

export default {
  components: {
    OrderForm
  },
  data() {
    return {};
  },
  methods: {
    redirect() {
      this.$router.push({
        path: '/orders'
      });
    },
    save() {
      this.$refs.orderForm.validate()
        .then(({
          isValid,
          order
        }) => {
          if (isValid) {
            const redirect = this.redirect;

            order.id = this.id;
            this.$store.dispatch(Constants.CREATE_ORDER, {
              order,
              redirect,
            });
          }
        });
    }
  }
};
</script>
