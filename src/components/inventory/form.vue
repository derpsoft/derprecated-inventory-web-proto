 <template>
<form @submit.prevent="validate">
  <div class="form-group">
    <label>Product</label>

    <autocomplete :focus="true" :suggestions="products" :value-selector="(v) => v" :key-selector="(v) => `${v.sku} ${v.title} ${v.description} ${v.color}`" :display-selector="(v) => `${v.sku}: ${v.title}`" @change="setProduct">
    </autocomplete>
  </div>

  <div class="form-group" :class="{'has-error': errors.has('quantity')}">
    <label>Quantity</label>

    <input type="number" name="quantity" class="form-control" placeholder="Quantity" v-model.number="value.quantity" v-validate="'required|numeric|between:1, 9999'">
    <span v-show="errors.has('quantity')" class="help-block">{{ errors.first('quantity') }}</span>
  </div>

  <div class="form-group" :class="{'has-error': errors.has('location')}">
    <label>Location</label>

    <autocomplete :selected="defaultLocation" :suggestions="locations" :value-selector="(v) => v" :key-selector="(v) => `${v.name}`" :display-selector="(v) => `${v.id}: ${v.name}`" @change="setLocation">
    </autocomplete>
  </div>
</form>
</template>

<script>
import _ from 'lodash';
import Constants from 'src/constants';
import Autocomplete from 'components/autocomplete';

export default {
  components: {
    Autocomplete,
  },

  data() {
    return {
      value: {
        quantity: 0,
        productId: 0,
        locationId: 0,
      },
    };
  },

  props: {
    defaultLocationName: {
      type: String,
      required: false,
    },
  },

  computed: {
    products() {
      return this.$store.getters.products;
    },
    productId() {
      return this.value.productId;
    },
    product() {
      return _.find(this.products, {
        id: this.productId
      });
    },

    locations() {
      return this.$store.getters.locations;
    },
    locationId() {
      return this.value.locationId;
    },
    location() {
      return _.find(this.locations, {
        id: this.locationId
      });
    },

    defaultLocation() {
      return _.find(this.locations, { name: this.defaultLocationName });
    },
  },

  mounted() {
    this.$store.dispatch(Constants.GET_PRODUCTS, {
      skip: 0,
      take: 1000
    });
    this.$store.dispatch(Constants.GET_LOCATIONS, {
      skip: 0,
      take: 1000
    });
  },

  methods: {
    validate() {
      return this.$validator
        .validateAll()
        .then((isValid) => {
          return {
            isValid,
            transaction: JSON.parse(JSON.stringify(this.value)),
          };
        });
    },
    setProduct(v) {
      this.value.productId = v.id;
    },
    setLocation(v) {
      this.value.locationId = v.id;
    },
  }

};
</script>
