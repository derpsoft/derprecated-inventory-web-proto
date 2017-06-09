<template>
<form @submit.prevent="validate">
  <div class="form-group" :class="{'has-error': errors.has('name')}">
    <label>Name</label>
    <input type="text" class="form-control" placeholder="Category Name" name="name" v-model="value.name" v-validate="'required'">
    <span v-show="errors.has('name')" class="help-block">{{ errors.first('name') }}</span>
  </div>
  <div class="form-group">
    <label>Parent Category</label>
    <small>(Leave blank if no parent)</small>
    <autocomplete :suggestions="categories" :selected="parent" :key-selector="(v) => `${v.name}`" :value-selector="(v) => v" :display-selector="(v) => `${v.id}: ${v.name}`" @change="setParent">
    </autocomplete>
  </div>
</form>
</template>

<script>
// @flow
import _ from 'lodash';
import Autocomplete from 'components/autocomplete';
import Constants from 'src/constants';

export default {
  components: {
    Autocomplete
  },

  data() {
    return {
      value: {},
    };
  },

  props: {
    category: {
      type: Object,
      required: false
    },
  },

  computed: {
    categories() {
      return _.filter(this.$store.getters.categories, v => v.id !== this.value.id);
    },
    parent() {
      return this.$store.getters.category(this.value.parentId);
    },
  },

  watch: {
    category: 'refresh'
  },

  mounted() {
    // $FlowFixMe
    this.$store.dispatch(Constants.GET_CATEGORIES, {
      skip: 0,
      take: 1000
    });
  },

  methods: {
    refresh() {
      if (this.category) {
        this.value = Object.assign({}, this.value, this.category);
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
            category: this.value
          };
        });
    },
    setParent(v: Object) {
      this.value.parentId = v.id;
    }
  }
};
</script>
