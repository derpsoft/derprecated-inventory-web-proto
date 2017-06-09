<style lang="css" scoped>
.same-as-shipping {
  margin-top: 11px;
}
</style>
<template>
  <form>
    <div class="row">
      <div class="col-sm-12">
        <h4>Order</h4>
        <div class="form-group">
          <order-form-products ref="productForm" :offers="value.offers" :disabled="!isBillable"></order-form-products>
        </div>
      </div>
      <div class="col-lg-6 col-sm-12">
        <h4>Shipping</h4>
        <customer-form ref="shippingCustomerForm" :customer="value.shippingCustomer"></customer-form>
        <address-form ref="shippingAddressForm" :address="value.shippingAddress"></address-form>
      </div>
      <div class="col-lg-6 col-sm-12">
        <label for="sameAsShipping" class="pull-right same-as-shipping">
          <input type="checkbox" class="form-input" id="sameAsShipping" v-model="sameAsShipping" :disabled="!isBillable" /> Same as Shipping
        </label>
        <h4>Billing</h4>
        <customer-form ref="billingCustomerForm" :customer="value.billingCustomer" :disabled="sameAsShipping"></customer-form>
        <address-form ref="billingAddressForm" :address="value.billingAddress" :disabled="sameAsShipping"></address-form>
      </div>
    </div>
  </form>
</template>

<script>
// @flow
import _ from 'lodash';
import Constants from 'src/constants';
import CustomerForm from 'components/customers/form';
import AddressForm from 'components/addresses/form';
import OrderFormProducts from './form-products';

export default {
  name: 'order-form',

  components: {
    CustomerForm,
    AddressForm,
    OrderFormProducts,
  },
  data() {
    return {
      sameAsShipping: true,
      value: {
        orderNumber: '',
        offers: [],
        shippingCustomer: {},
        shippingAddress: {},
        billingCustomer: {},
        billingAddress: {},
        merchant: {},
        status: Constants.orderStatus.PENDING,
        paymentMethod: '',
        paymentMethodId: '',
        rowVersion: 0,
      },
    };
  },

  props: {
    id: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  computed: {
    order() {
      return this.$store.getters.order(this.id);
    },
    productForm() {
      return this.$refs.productForm;
    },
    shippingCustomerForm() {
      return this.$refs.shippingCustomerForm;
    },
    billingCustomerForm() {
      return this.$refs.billingCustomerForm;
    },
    shippingAddressForm() {
      return this.$refs.shippingAddressForm;
    },
    billingAddressForm() {
      return this.$refs.billingAddressForm;
    },
    isNew() {
      return this.value && this.value.status === Constants.orderStatus.PENDING;
    },
    isBillable() {
      return this.isNew ||
        (
          this.value && this.value.status === Constants.orderStatus.AWAITING_PAYMENT
        );
    },
    isShippable() {
      return this.isBillable ||
        (
          this.value && this.value.status === Constants.orderStatus.AWAITING_SHIPMENT
        );
    },
  },

  watch: {
    id: 'load',
    order: 'refresh',
  },

  mounted() {
    this.load();
  },

  methods: {
    load() {
      if (this.id > 0) {
        // $FlowFixMe
        this.$store.dispatch(Constants.GET_ORDER, {
          id: this.id,
        });
      }
      // $FlowFixMe
      this.$store.dispatch(Constants.GET_PRODUCTS, {
        skip: 0,
        take: 1000,
      });
    },
    refresh() {
      this.value = Object.assign({}, this.value, this.order);
    },
    validate() {
      return Promise
        .all([
          this.$validator.validateAll(),
          this.productForm.validate(),
          this.shippingCustomerForm.validate(),
          this.shippingAddressForm.validate(),
          this.billingCustomerForm.validate(),
          this.billingAddressForm.validate(),
        ])
        .then((results) => {
          const order = Object.assign({}, this.value);
          const valid = _.head(results) && _(results)
            .tail()
            .map('isValid')
            .every();

          if (this.isBillable) {
            order.offers = results[1].offers;
            order.price = results[1].price;
            order.billingCustomer = this.sameAsShipping ? order.shippingCustomer :
              results[4].customer;
            order.billingAddress = this.sameAsShipping ? order.shippingAddress :
              results[5].address;
          }
          if (this.isShippable) {
            order.shippingCustomer = results[2].customer;
            order.shippingAddress = results[3].address;
          }


          return {
            isValid: valid,
            order
          };
        })
        .catch((e) => {
          throw e;
        });
    },
  }
};
</script>
