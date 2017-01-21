<template>
  <div>
    <div class="row control-row">
      <div class="col-md-12">
        <button class="btn btn-primary pull-right" @click="save">Create Category</button>
        <h4>Category Details</h4>
      </div>
    </div>
    <div class="panel panel-filled panel-main">
      <div class="panel-body">
        <category-form @change="setCategory" @is-valid="setValid"></category-form>
      </div>
    </div>
  </div>
</template>

<script>
import Constants from '../../constants';
import CategoryForm from './form.vue';

export default {
  components: { CategoryForm },
  data() {
    return {
      category: {},
      isValid: false,
    };
  },
  methods: {
    redirect() {
      this.$router.push({ path: '/categories' });
    },
    save() {
      if (this.isValid) {
        const category = JSON.parse(JSON.stringify(this.category));
        const redirect = this.redirect;

        category.id = this.id;
        this.$store.dispatch(Constants.CREATE_CATEGORY, {
          category,
          redirect,
        });
      }
    },
    setCategory(v) {
      this.category = Object.assign({}, this.category, v);
    },
    setValid(flag) {
      this.isValid = flag;
    },
  }
};
</script>
