<template>
<div>
  <autocomplete ref="productList" :editable="true" :selected="products" :suggestions="allProducts"
      :value-selector="(v) => v" :key-selector="(v) => v.title" :display-selector="(v) => `${v.id}: ${v.title}`"
      :draw-selections="false" :disabled="disabled" @change="setProducts">
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
          <tr v-for="(offer, index) in value">
            <td>{{ product(offer.productId, 'sku') }}</td>
            <td>{{ product(offer.productId, 'title') | truncate }}</td>
            <td>
              <input type="number" class="form-control" min=1 step=1 v-model.number="offer.quantity" :disabled="disabled"></td>
            <td>{{ offer | offerPrice | formatCurrency }}</td>
            <td>
              <button type="button" class="btn-xs btn-default" @click="removeOffer(index)" v-if="!disabled">X</button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>Total: {{ value | total | formatCurrency }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
</div>

</template>

<script>
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
  },

  filters: {
    offerPrice(offer) {
      if (offer) {
        return offer.price * Math.max(offer.quantity, 1);
      }
      return 0;
    },
    total(offers) {
      if (offers && offers.length) {
        return _(offers)
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
  },

  computed: {
    allProducts() {
      return this.$store.getters.products;
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
        this.$store.dispatch(Constants.GET_PRODUCT, {
          id: productId,
          includeDeleted: true
        });
      });
    },

    removeOffer(index) {
      this.$refs.productList.removeSelected(index);
    },

    setProducts(list) {
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
            offers: JSON.parse(JSON.stringify(this.value))
          };
        })
        .catch(() => {
          return {
            isValid: this.disabled,
            offers: JSON.parse(JSON.stringify(this.value))
          };
        });
    },
  },
};

</script>
