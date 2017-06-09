<style lang="css" scoped>
</style>
<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Add Order
            <div class="card-actions">
              <router-link class="btn btn-primary btn-return" :to="{path: '/orders'}">Back to Orders</router-link>
              <button class="create-order btn btn-primary" @click="save">Create Order</button>
            </div>
          </div>
          <div class="card-block">
            <order-form ref="orderForm"></order-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @flow
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
            // $FlowFixMe
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
