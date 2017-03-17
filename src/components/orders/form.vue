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
                  <tr v-for="(offer, id, index) in value.acceptedOffers">
                    <td>{{ offer.product.sku }}</td>
                    <td>{{ offer.product.title | truncate }}</td>
                    <td>
                      <input type="number" class="form-control" min=1 step=1 v-model.number="offer.quantity"></td>
                    <td>{{ offer | price | formatCurrency }}
                    </td>
                    <td>
                      <button type="button" class="btn-xs btn-default" @click="removeOffer(index)">X</button>
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
        <customer-form ref="shippingCustomerForm" :customer="value.shippingCustomer"></customer-form>
        <address-form ref="shippingAddressForm" :address="value.shippingAddress"></address-form>
      </div>

      <div class="col-lg-6 col-sm-12">
        <h4>Billing</h4>
        <div class="checkbox-inline">
          <label for="sameAsShipping">
            <input type="checkbox" class="form-input" id="sameAsShipping" v-model="sameAsShipping" />
            Same as Shipping
          </label>
        </div>
        <customer-form ref="billingCustomerForm" :customer="value.billingCustomer" :disabled="sameAsShipping"></customer-form>
        <address-form ref="billingAddressForm" :address="value.billingAddress" :disabled="sameAsShipping"></address-form>
      </div>
    </div>
  </div>
</form>

</template>

<script>
import _ from 'lodash';
import Constants from 'src/constants';
import CustomerForm from 'components/customers/form';
import AddressForm from 'components/addresses/form';
import Autocomplete from 'components/autocomplete-multiple';

export default {
  name: 'order-form',

  components: {
    CustomerForm,
    Autocomplete,
    AddressForm,
  },
  data() {
    return {
      sameAsShipping: true,
      value: {
        orderNumber: '',
        products: [],
        acceptedOffers: {},
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

  filters: {
    price({
      price,
      quantity
    }) {
      return price * Math.max(quantity, 1);
    },
    total(offers) {
      return _(offers)
        .map(({
          price,
          quantity
        }) => price * Math.max(quantity, 1))
        .sum();
    },
  },

  computed: {
    order() {
      return this.$store.getters.order(this.id);
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
      const ids = _.map(list, 'id');
      const updates = _.keyBy(list, 'id');

      // remove existing products that don't exist in the new list
      const offers = Object.assign({}, _.pick(this.value.acceptedOffers, ids));

      // merge in new products with a default quantity
      this.value.acceptedOffers = _.mergeWith(
        offers,
        updates,
        (existing, update) => {
          if (!updates) {
            return null;
          }
          return _.defaults({}, existing, {
            price: update.price,
            product: update,
            productId: update.id,
            quantity: 1,
          });
        });
      this.value.products = list;
    },
    removeOffer(index) {
      this.$refs.productList.removeSelected(index);
    },
    validate() {
      return Promise
        .all([
          this.$validator.validateAll(),
          this.shippingCustomerForm.validate(),
          this.shippingAddressForm.validate(),
          this.billingCustomerForm.validate(),
          this.billingAddressForm.validate(),
        ])
        .then((results) => {
          const order = _.pick(this.value, ['acceptedOffers', 'rowVersion', 'id']);
          const valid = _.head(results) && _(results)
            .tail()
            .map('isValid')
            .every();

          order.acceptedOffers = _.values(order.acceptedOffers);
          order.shippingCustomer = results[1].customer;
          order.shippingAddress = results[2].address;
          order.billingCustomer = this.sameAsShipping ? order.shippingCustomer :
            results[3].customer;
          order.billingAddress = this.sameAsShipping ? order.shippingAddress :
            results[4].address;

          return {
            isValid: valid,
            order
          };
        })
        .catch(e => console.error(e));
    },
  }
};

</script>
