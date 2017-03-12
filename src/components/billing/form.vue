<template>
<form>
  <!-- <stripe-checkout :stripe-key="stripeKey" :products="stripeProducts"></stripe-checkout> -->
</form>
</template>

<script>
import _ from 'lodash';
import config from 'root/config';
import {
  StripeCheckout
} from 'vue-stripe';

export default {
  components: {
    StripeCheckout
  },

  props: {
    products: {
      type: Array,
      required: true,
    },
    stipeKey: {
      type: String,
      required: false,
      default: config.stripe.publishableKey,
    }
  },

  computed: {
    stripeProducts() {
      return _(this.products)
        .map((product) => {
          return {
            ...product
          };
        });
    }
  },
};

</script>
