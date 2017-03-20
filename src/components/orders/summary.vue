<template>
<div class="container-fluid">
  <div class="row">
    <div class="col-sm-6">
      <h4>Order Information</h4>
      <p>Order Placed: {{value.createDate | formatDate}}</p>
      <p>Order Number: {{value.orderNumber | formatOrderNumber}}</p>
      <p>Order Total: {{value.price | formatCurrency}}</p>
      <p>Order Status: {{value.status}}</p>
    </div>
    <div class="col-sm-6" v-if="isBilled">
      <h4>Payment Information</h4>
      <p>Card: {{value.paymentMethod}}, last digits {{value.paymentMethodId}}</p>
      <p>Transaction Date: {{value.billDate | formatDate}}</p>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-6" v-if="isBilled">
      <h4>Billing Address</h4>
      <address-summary :address="value.billingAddress"></address-summary>
    </div>
    <div class="col-sm-6" v-if="isShipped">
      <h4>Shipping Address</h4>
      <address-summary :address="value.shippingAddress"></address-summary>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-12">
      <h4>Items Ordered</h4>
      <div class="table-responsive">
        <table class="table table-striped list">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(offer, index) in value.offers">
              <td>
                {{offer.quantity}} of: {{offer.product.title}}
              </td>
              <td>
                {{offer.price | formatCurrency}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import Constants from 'src/constants';
import AddressSummary from 'components/addresses/summary';
import Autocomplete from 'components/autocomplete-multiple';

export default {
  name: 'order-summary',

  components: {
    Autocomplete,
    // CustomerSummary,
    AddressSummary,
  },
  data() {
    return {
      value: {
        shippingAddress: {},
        billingAddress: {},
        offers: [],
      },
    };
  },

  computed: {
    orderNumber() {
      return this.$route.params.orderNumber;
    },
    orderKey() {
      return this.$route.params.orderKey;
    },
    order() {
      return this.$store.getters.order(this.orderNumber);
    },
    isBilled() {
      return this.value && this.value.billDate;
    },
    isShipped() {
      return this.value && this.value.shipDate;
    },
  },

  watch: {
    order: 'refresh',
    $route: 'load',
  },

  mounted() {
    this.load();
  },

  methods: {
    load() {
      if (this.orderNumber && this.orderKey) {
        this.$store.dispatch(Constants.GET_ORDER_BY_KEY, {
          key: this.orderKey,
          id: this.orderNumber,
        });
      }
    },

    refresh() {
      this.value = Object.assign({}, this.value, this.order);
    },
  }
};

</script>
