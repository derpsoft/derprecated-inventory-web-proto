<style lang="css" scoped>
</style>
<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Add Categories
            <div class="card-actions">
              <router-link class="btn btn-w-md btn-accent btn-return" :to="{path: '/categories'}">Back to Categories</router-link>
              <button class="btn btn-primary pull-right" @click="save">Create Category</button>
            </div>
          </div>
          <div class="card-block">
          <category-form ref="categoryForm"></category-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @flow
import Constants from 'src/constants';
import CategoryForm from './form';

export default {
  name: 'addCategories',
  components: {
    CategoryForm
  },
  data() {
    return {
      category: {},
      isValid: false,
    };
  },
  methods: {
    redirect() {
      this.$router.push({
        path: '/categories'
      });
    },
    validate() {
      return this.$refs.categoryForm.validate();
    },
    save() {
      this.validate()
        .then(({
          isValid,
          category
        }) => {
          if (isValid) {
            const redirect = this.redirect;
            // $FlowFixMe
            this.$store.dispatch(Constants.CREATE_CATEGORY, {
              category,
              redirect,
            });
          }
        });
    },
  }
};
</script>
