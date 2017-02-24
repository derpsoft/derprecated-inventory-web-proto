<template>
<form @submit.prevent="validate">
  <div class="form-group" :class="{'has-error': errors.has('name')}">
    <label>Name</label>
    <input type="text" class="form-control" placeholder="Image Name" name="name" v-model="value.name" v-validate="'required'" v-focus="true">
    <span v-show="errors.has('name')" class="help-block">{{ errors.first('name') }}</span>
  </div>
</form>
</template>

<script>
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
    image: {
      type: Object,
      required: false
    },
  },

  computed: {
    images() {
      return _.filter(this.$store.getters.images, v => v.id !== this.value.id);
    },
    parent() {
      return this.$store.getters.image(this.value.parentId);
    },
  },

  watch: {
    image: 'refresh'
  },

  mounted() {
    this.$store.dispatch(Constants.GET_IMAGES, {
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
    setParent(v) {
      this.value.parentId = v.id;
    }
  }
};
</script>
