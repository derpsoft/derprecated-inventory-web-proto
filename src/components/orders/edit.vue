<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Edit Order
            <div class="card-actions">
              <router-link class="btn btn-primary btn-return" :to="{path: '/orders'}">Back to Orders</router-link>
              <button type="button" class="btn btn-danger" @click="deleteConfirm" v-can-manage-orders v-if="isBillable">Delete</button>
              <button class="btn btn-primary pull-right" @click="save" v-if="isSaveable">Save Order</button>
              <button class="btn btn-primary pull-right" @click="fulfilled" v-if="isFulfillable">Mark as Fulfilled</button>
              <button class="btn btn-primary pull-right" @click="shipped" v-if="isShippable">Mark as Shipped</button>
            </div>
          </div>
          <div class="card-block">
            <small v-if="!isSaveable" class="pull-right">Order has shipped and may not be edited</small>
          </div>
          <div class="card-block">
            <billing-form ref="billingForm" cssClass="pull-right" :amount="order.price | toCents" :description="`Custom order ${order.orderNumber}`" @success="billingCaptured" v-if="isBillable"></billing-form>
          </div>
          <div class="card-block">
            <order-status :id="id"></order-status>
            <order-form ref="orderForm" :id="id"></order-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @flow
import Constants from 'src/constants';
import BillingForm from 'components/billing/form';
import OrderForm from './form';
import OrderStatus from './status';

export default {
  name: 'editOrder',
  components: {
    OrderForm,
    BillingForm,
    OrderStatus,
  },

  data() {
    return {};
  },

  filters: {
    toCents(dollars: number) {
      return (dollars * 100) >> 0;
    },
  },

  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    },
    order() {
      return this.$store.getters.order(this.id);
    },
    isSaveable() {
      return this.isBillable || this.isFulfillable || this.isShippable;
    },
    isBillable() {
      // $FlowFixMe
      return this.order && this.order.status === Constants.orderStatus.AWAITING_PAYMENT;
    },
    isFulfillable() {
      // $FlowFixMe
      return this.order && this.order.status === Constants.orderStatus.AWAITING_FULFILLMENT;
    },
    isShippable() {
      // $FlowFixMe
      return this.order && this.order.status === Constants.orderStatus.AWAITING_SHIPMENT;
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
            // $FlowFixMe
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
      // $FlowFixMe
      this.$store.dispatch(Constants.DELETE_ORDER, {
        id: this.id,
        rowVersion: this.order.rowVersion,
        redirect: this.redirect,
      });
    },

    billingCaptured({
      // email,
      token,
    }: Object) {
      // $FlowFixMe
      this.$store.dispatch(Constants.ORDER_BILLING_CAPTURED, {
        order: this.order,
        token,
      });
    },

    updateStatus(status: string) {
      // $FlowFixMe
      this.$store.dispatch(Constants.ORDER_STATUS_UPDATE, {
        order: this.order,
        status,
      });
    },

    shipped() {
      this.updateStatus('shipped');
    },

    fulfilled() {
      this.updateStatus('fulfilled');
    },
  }
};
</script>
