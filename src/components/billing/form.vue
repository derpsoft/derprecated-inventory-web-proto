<template>
<form>
  <stripe-checkout :stripe-key="stripeKey" :product="product"></stripe-checkout>
</form>

</template>

<script>
import config from 'root/config';
import StripeCheckout from 'vue-stripe';

export default {
  name: 'billing-form',

  components: {
    'stripe-checkout': StripeCheckout.StripeCheckout
  },

  props: {
    amount: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: false,
      default: 'derprecated, LLC'
    },
    description: {
      type: String,
      required: false,
      default: 'Custom order'
    },
    stripeKey: {
      type: String,
      required: false,
      default: config.stripe.publishableKey,
    }
  },

  computed: {
    product() {
      return {
        name: this.name,
        description: this.description,
        amount: this.amount,
      };
    }
  },
};

</script>
