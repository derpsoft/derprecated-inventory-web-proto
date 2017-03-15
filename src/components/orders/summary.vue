<template>
<form>
  <div class="container-fluid">
  </div>
</form>

</template>

<script>
import _ from 'lodash';
import Constants from 'src/constants';
import CustomerSummary from 'components/customers/summary';
import AddressSummary from 'components/addresses/summary';
import Autocomplete from 'components/autocomplete-multiple';

export default {
  name: 'order-summary',

  components: {
    CustomerSummary,
    Autocomplete,
    AddressSummary,
  },
  data() {
    return {
      sameAsShipping: true,
      value: {
        orderNumber: '',
        acceptedOffers: {},
        shippingCustomer: {},
        shippingAddress: {},
        billingCustomer: {},
        billingAddress: {},
        merchant: {},
        status: Constants.orderStatus.PENDING,
        paymentMethod: '',
        paymentMethodId: '',
      },
    };
  },

  props: {
    orderNumber: {
      type: String,
      required: true,
    },
  },

  filters: {
    formatTitle(x) {
      return _.truncate(x, {
        length: 50
      });
    },
    formatCurrency(x) {
      return Intl
        .NumberSummaryat('en-US', {
          style: 'currency',
          currencyDisplay: 'symbol',
          currency: 'USD',
        })
        .format(x);
    },
  },

  computed: {
    order() {
      return this.$store.getters.orderByOrderNumber(this.number);
    },
    shippingCustomerSummary() {
      return this.$refs.shippingCustomerSummary;
    },
    billingCustomerSummary() {
      return this.$refs.billingCustomerSummary;
    },
    shippingAddressSummary() {
      return this.$refs.shippingAddressSummary;
    },
    billingAddressSummary() {
      return this.$refs.billingAddressSummary;
    },
    products() {
      return this.$store.getters.products;
    },
    productList() {
      return this.$refs.productList;
    },
  },

  watch: {
    order: 'refresh',
  },

  mounted() {
    this.load();
  },

  methods: {
    load() {
      if (this.orderNumber) {
        this.$store.dispatch(Constants.GET_ORDER_BY_NUMBER, {
          orderNumber: this.orderNumber,
        });
      }
    },

    refresh() {
      this.value = Object.assign({}, this.value, this.order);
    },
  }
};

</script>
