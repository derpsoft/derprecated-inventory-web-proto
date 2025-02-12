<template>
<form @submit.prevent="validate">
  <div class="form-group" :class="{'has-danger': errors.has('name')}">
    <label class="form-control-label">Name</label>
    <input type="text" class="form-control" placeholder="Image Name" name="name" v-model="value.name" v-validate="'required'" :class="{'form-control-danger': errors.has('name') }">
    <span v-show="errors.has('name')" class="form-control-feedback">{{ errors.first('name') }}</span>
  </div>
  <div class="form-group">
    <label>Products</label>
    <autocomplete :selected="associatedProducts" :suggestions="products" :value-selector="(v) => v.id" :key-selector="(v) => v.title" :display-selector="(v) => `${v.id}: ${v.title}`" @change="setProducts">
    </autocomplete>
  </div>
</form>
</template>

<script>
// @flow
import Autocomplete from 'components/autocomplete-multiple';
import Constants from 'src/constants';

export default {
  components: {
    Autocomplete
  },

  data() {
    return {
      value: {
        productIds: []
      },
    };
  },

  props: {
    image: {
      type: Object,
      required: false
    },
  },

  computed: {
    products() {
      return this.$store.getters.products;
    },
    associatedProducts() {
      return this.value.products;
    }
  },

  watch: {
    image: 'refresh'
  },

  mounted() {
    // $FlowFixMe
    this.$store.dispatch(Constants.GET_PRODUCTS, {
      skip: 0,
      take: 1000
    });
  },

  methods: {
    refresh() {
      if (this.image) {
        this.value = Object.assign({}, this.value, this.image);
        this.validate();
      }
    },
    change() {
      this.validate();
    },
    validate() {
      return this.$validator
        .validateAll()
        .then((isValid) => {
          return {
            isValid,
            image: this.value
          };
        });
    },
    setProducts(v: string[]) {
      this.value.productIds = v;
    }
  }
};
</script>
