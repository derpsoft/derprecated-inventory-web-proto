<style lang="css" scoped>
.order-products {
  table {
    margin-top: 20px;

    thead, tbody {
      &>tr {
        th, td {
          padding: 10px 20px;
          border: 0;
        }
      }
    }
  }

  tfoot {
    border-top: 1px solid #ccc;
    padding-top: 20px;

    tr > td {
      border: 0;
    }
  }

  .no-orders {
    text-align: center;
    padding: 20px 20px;
    font-weight: bold;
    font-size: 1.5em;
  }
}
</style>
<template>
  <div class="order-products">
    <autocomplete ref="productList" :editable="true" :selected="products" :suggestions="allProducts" :value-selector="(v) => v" :key-selector="(v) => v.title" :display-selector="(v) => `${v.id}: ${v.title}`" :draw-selections="false" :disabled="disabled" @change="setProducts">
    </autocomplete>
    <div v-if="value.length === 0" class="no-orders">
      Please select an order to begin.
    </div>
    <div class="table-responsive" v-if="value.length">
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
          <tr v-for="(offer, index) in value">
            <td>{{ product(offer.productId, 'sku') }}</td>
            <td>{{ product(offer.productId, 'title') | truncate }}</td>
            <td>
              <input type="number" class="form-control" min="1" step="1" v-model.number="offer.quantity" :disabled="disabled"></td>
            <td class="text-right">{{ offer | offerPrice | formatCurrency }}</td>
            <td class="text-right">
              <button type="button" class="btn btn-link" @click="removeOffer(index)" v-if="!disabled">X</button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td class="text-right" colspan="3">Subtotal:</td>
            <td class="text-right">{{ subtotal | formatCurrency }}</td>
          </tr>
          <tr>
            <td class="text-right" colspan="3">Tax:</td>
            <td class="text-right">{{ tax | formatCurrency }}</td>
          </tr>
          <tr>
            <td class="text-right" colspan="3">Total:</td>
            <td class="text-right">{{ total | formatCurrency }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
// @flow
import _ from 'lodash';
import Autocomplete from 'components/autocomplete-multiple';
import Constants from 'src/constants';

export default {
  name: 'order-form-products',
  components: {
    Autocomplete,
  },

  data() {
    return {
      value: [],
      products: [],
    };
  },

  props: {
    offers: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    taxRate: {
      type: Number,
      required: false,
      default: 0.09250,
    },
  },

  filters: {
    offerPrice(offer: Object) {
      if (offer) {
        return offer.price * Math.max(offer.quantity, 1);
      }
      return 0;
    },
  },

  computed: {
    subtotal() {
      if (this.value) {
        return _(this.value)
          .map((offer) => {
            if (offer) {
              return offer.price * Math.max(offer.quantity, 1);
            }
            return 0;
          })
          .sum();
      }
      return 0;
    },
    tax() {
      return this.subtotal * this.taxRate;
    },
    total() {
      return (this.subtotal + this.tax).toFixed(3);
    },
    allProducts() {
      return this.$store.getters.products;
    },
    product() {
      return (productId: number, field: string) => {
        let x = Object.assign({}, this.$store.getters.product(productId));
        if (x && field) {
          x = x[field];
        }
        return x;
      };
    },
    offeredProducts() {
      return _.map(this.value, ({
        productId,
        product
      }) => {
        return product || this.product(productId);
      });
    },
    offeredProductIds() {
      return _.pick(this.value, 'productId');
    },
  },

  watch: {
    offers: 'load',
  },

  mounted() {
    this.load();
  },

  methods: {
    load() {
      this.value = this.offers.slice();
      _.forEach(this.offeredProductIds, (productId) => {
        // $FlowFixMe
        this.$store.dispatch(Constants.GET_PRODUCT, {
          id: productId,
          includeDeleted: true
        });
      });
    },

    removeOffer(index: number) {
      this.$refs.productList.removeSelected(index);
    },

    setProducts(list: Object) {
      const updates = _.map(list, (product) => {
        return {
          product,
          productId: product.id,
          price: product.price,
          quantity: 1,
        };
      });
      const offers = _.unionBy(this.value, updates, 'productId');

      this.value = offers;
      this.products = list;
    },

    validate() {
      return this.$validator
        .validateAll()
        .then((isValid) => {
          return {
            isValid: this.disabled || isValid,
            offers: JSON.parse(JSON.stringify(this.value)),
            price: this.total,
          };
        })
        .catch(() => {
          return {
            isValid: this.disabled,
            offers: JSON.parse(JSON.stringify(this.value)),
            price: this.total,
          };
        });
    },
  },
};
</script>
