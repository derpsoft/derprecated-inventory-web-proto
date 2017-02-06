<template>
  <div>
    <div class="row control-row">
      <div class="col-md-12">
        <button class="btn btn-primary pull-right" @click="save">Save Category</button>
        <h4>Category Details</h4>
      </div>
    </div>
    <div class="panel panel-filled panel-main">
      <div class="panel-body">
        <category-form :category="category" @change="setCategory" @is-valid="setValid"></category-form>
      </div>
    </div>
  </div>
</template>

<script>
import Constants from 'src/constants';
import CategoryForm from './form';

export default {
  components: { CategoryForm },
  data() {
    return {
      category: {},
      isValid: false,
    };
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    }
  },
  watch: {
    $route: 'load'
  },
  methods: {
    load() {
      this.$store.dispatch(Constants.GET_CATEGORY, {
        id: this.id,
      });
    },
    save() {
      if (this.isValid) {
        const category = JSON.parse(JSON.stringify(this.category));
        category.id = this.id;
        this.$store.dispatch(Constants.SAVE_CATEGORY, {
          category
        });
      }
    },
    setCategory(v) {
      this.category = Object.assign({}, this.category, v);
    },
    setValid(flag) {
      this.isValid = flag;
    },
  },
  mounted() {
    this.$store.watch(
      () => this.$store.getters.category,
      v => this.setCategory(v)
    );
    this.load();
  }
};
</script>
