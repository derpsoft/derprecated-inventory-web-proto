<style lang="css" scoped>
.control-row {
  margin: 10px 0;
}

</style>
<template>
<div>
  <div class="control-row clearfix">
      <button class="create-order btn btn-primary" @click="save">Create Order</button>
  </div>
  <div class="panel panel-filled panel-main">
    <div class="panel-body">
      <order-form ref="orderForm"></order-form>
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
