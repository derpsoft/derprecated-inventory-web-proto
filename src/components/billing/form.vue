<template>
<form :class="cssClass">
  <stripe-checkout :stripe-key="stripeKey" :product="product" on-success="broadcast"></stripe-checkout>
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
    },
    cssClass: {
      type: String,
      required: false,
      default: '',
    },
  },

  mounted() {
    StripeCheckout.Bus.$on('vue-stripe.success', (payload) => {
      this.onSuccess(payload);
    });
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

  methods: {
    onSuccess(payload) {
      this.$emit('success', payload);
    }
  },
};

</script>
