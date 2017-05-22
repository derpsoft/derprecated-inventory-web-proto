<style lang="css" scoped>
.btn-primary {
  margin-bottom: 20px;
}

</style>
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
      <category-form ref="categoryForm"></category-form>
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
