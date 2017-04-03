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
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Quantity</th>
              <th>SKU</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(offer, index) in value.offers">
              <td>{{offer.quantity}}</td>
              <td>{{product(offer.productId, 'sku')}}</td>
              <td>{{product(offer.productId, 'title')}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @flow
import _ from 'lodash';
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
    product() {
      return (productId, field) => {
        let x = Object.assign({}, this.$store.getters.product(productId));
        if (x && field) {
          x = x[field];
        }
        return x;
      };
    },
    offeredProducts() {
      return _.map(this.value.offers, ({
        productId,
        product
      }) => {
        return product || this.product(productId);
      });
    },
    offeredProductIds() {
      return _.pick(this.offeredProducts, 'productId');
    },
    isBilled() {
      return this.value && this.value.billDate;
    },
    isShipped() {
      return this.value && this.value.shipDate;
    },
  },

  watch: {
    $route: 'load',
    order: 'refresh',
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
      _.forEach(this.value.offers, ({
        productId
      }) => {
        this.$store.dispatch(Constants.GET_PRODUCT, {
          id: productId,
          includeDeleted: true
        });
      });
    },
  }
};
</script>
