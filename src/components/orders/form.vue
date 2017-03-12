<template>
<form>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12">
        <h4>Order</h4>

        <div class="form-group">
          <label>Products</label>

          <autocomplete ref="productList" :editable="true" :selected="value.products" :suggestions="products"
              :value-selector="(v) => v" :key-selector="(v) => v.title" :display-selector="(v) => `${v.id}: ${v.title}`"
              :draw-selections="false" @change="setProducts">
            </autocomplete>

            <div class="table-responsive">
              <table class="table table-striped table-hover list">
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="offer in value.acceptedOffers">
                    <td>{{ offer.product.sku }}</td>
                    <td>{{ offer.product.title | formatTitle }}</td>
                    <td>
                      <input type="number" class="form-control" min=1 step=1 v-model.number="offer.quantity"></td>
                    <td>{{ offer | price | | formatCurrency }}
                    </td>
                    <td>
                      <button type="button" class="btn-xs btn-default" @click="removeOffer(offer)">X</button>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Total: {{ value.acceptedOffers | total | formatCurrency }}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
        </div>

      </div>

      <div class="col-lg-6 col-sm-12">
        <h4>Shipping</h4>
        <customer-form ref="customerForm" :id="value.customer.id"></customer-form>
        <address-form ref="shippingAddressForm" :address="value.shippingAddress"></address-form>
      </div>

      <div class="col-lg-6 col-sm-12">
        <h4>Billing</h4>
        <billing-form ref="billingForm"></billing-form>
        <address-form ref="billingAddressForm" :address="value.billingAddress"></address-form>
      </div>
    </div>
  </div>
</form>

</template>

<script>
import _ from 'lodash';
import Vue from 'vue';
import Constants from 'src/constants';
import CustomerForm from 'components/customers/form';
import BillingForm from 'components/billing/form';
import AddressForm from 'components/addresses/form';
import Autocomplete from 'components/autocomplete-multiple';

export default {
  components: {
    CustomerForm,
    Autocomplete,
    AddressForm,
    BillingForm,
  },
  data() {
    return {
      value: {
        orderNumber: '',
        customer: {},
        products: [],
        acceptedOffers: {},
        billingAddress: {},
        shippingAddress: {},
        merchant: {},
        orderStatus: 'new',
        paymentMethod: '',
        paymentMethodId: '',
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

  filters: {
    price({
      product,
      quantity
    }) {
      return product.price * Math.max(quantity, 1);
    },
    total(offers) {
      return _(offers)
        .map(({
          product,
          quantity
        }) => product.price * Math.max(quantity, 1))
        .sum();
    },
    formatTitle(x) {
      return _.truncate(x, {
        length: 50
      });
    },
    formatCurrency(x) {
      return Intl
        .NumberFormat('en-US', {
          style: 'currency',
          currencyDisplay: 'symbol',
          currency: 'USD',
        })
        .format(x);
    },
  },

  computed: {
    order() {
      return this.$store.getters.order(this.id);
    },
    customerForm() {
      return this.$refs.customerForm;
    },
    shippingAddressForm() {
      return this.$refs.shippingAddressForm;
    },
    billingAddressForm() {
      return this.$refs.billingAddressForm;
    },
    products() {
      return this.$store.getters.products;
    },
    productList() {
      return this.$refs.productList;
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
        this.$store.dispatch(Constants.GET_ORDER, {
          id: this.id,
        });
      }
      this.$store.dispatch(Constants.GET_PRODUCTS, {
        skip: 0,
        take: 100,
      });
    },
    refresh() {
      this.value = Object.assign({}, this.value, this.order);
    },
    setProducts(list) {
      this.value.products = list;
      _.each(list, (product) => {
        const offer = _.defaults({}, this.value.acceptedOffers[product.id], {
          product,
          quantity: 1,
        });
        Vue.set(this.value.acceptedOffers, product.id, offer);
      });
    },
    removeOffer({
      product
    }) {
      this.$refs.productList.removeSelected(product.id);
    },
    validate() {
      return Promise
        .all([
          this.customerForm.validate(),
          this.shippingAddressForm.validate(),
          this.billingAddressForm.validate(),
          this.$validator.validateAll()
        ])
        .then(([customerResult, shippingAddressResult, billingAddressResult,
          orderResult
        ]) => {
          const {
            order
          } = orderResult;

          order.customer = customerResult.customer;
          order.shippingAddress = shippingAddressResult.address;
          order.billingAddress = billingAddressResult.address;

          const valid = _.every([customerResult, shippingAddressResult,
            billingAddressResult, orderResult
          ], ({
            isValid
          }) => isValid);

          return {
            isValid: valid,
            order
          };
        });
    },
  }
};

</script>
