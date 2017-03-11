<template>
<form>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-6 col-sm-12">
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
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="offer in value.acceptedOffers">
                    <td>{{ offer.product.title | formatTitle }}</td>
                    <td>
                      <input type="number" class="form-control" min=1 step=1 v-model.number="offer.quantity"></td>
                    <td>{{ (offer.product.price * Math.max(offer.quantity, 1)) | formatCurrency
                      }}</td>
                    <td>
                      <button type="button" class="btn-xs btn-default" @click="removeOffer(offer)">X</button>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Total: {{ value.acceptedOffers | total | formatCurrency }}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
        </div>

        <!-- <div class="form-group" :class="{'has-error': errors.has('name')}">
          <label>Name</label>
          <input type="text" class="form-control" placeholder="Order Name" name="name" v-model="value.name"
              v-validate="'required'">
            <span v-show="errors.has('name')" class="help-block">{{ errors.first('name') }}</span>
        </div> -->

      </div>

      <div class="col-lg-6 col-sm-12">
        <h4>Customer</h4>
        <customer-form ref="customerForm" :id="value.customer.id"></customer-form>
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
import Autocomplete from 'components/autocomplete-multiple';

function calculatePrice(offer) {
  const {
    product,
    quantity
  } = offer;
  console.debug(offer, product, quantity);
  let q = 1;
  if (typeof quantity === 'string') {
    q = parseInt(quantity, 10);
  }
  q = Math.max(q, 1);
  return product.price * q;
}

function calculateTotal(acceptedOffers) {
  return _(acceptedOffers).map(offer => calculatePrice(offer)).sum();
}

export default {
  components: {
    CustomerForm,
    Autocomplete,
  },
  data() {
    return {
      value: {
        orderNumber: '',
        customer: {},
        products: [],
        acceptedOffers: {},
        billingAddress: {},
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
    formatTitle(x) {
      return `${x.substring(0, 30)}${x.length > 30 ? '...' : ''}`;
    },
    calcPrice: calculatePrice,
    formatCurrency(x) {
      return Intl
        .NumberFormat('en-US', {
          style: 'currency',
          currencyDisplay: 'symbol',
          currency: 'USD',
        })
        .format(x);
    },
    total: calculateTotal,
  },

  computed: {
    order() {
      return this.$store.getters.order(this.id);
    },
    customerForm() {
      return this.$refs.customerForm;
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
      return Promise.all(
          this.customerForm.validate(),
          this.$validator.validateAll()
        )
        .then(([customerResult, orderResult]) => {
          const {
            order
          } = orderResult;
          const {
            customer
          } = customerResult;

          order.customer = customer;

          console.debug(order);

          return {
            isValid: customerResult.isValid && orderResult.isValid,
            order
          };
        });
    },
  }
};

</script>
