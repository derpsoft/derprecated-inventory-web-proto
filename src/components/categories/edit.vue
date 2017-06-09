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
              <button type="button" class="btn btn-danger" @click="deleteConfirm" v-can-delete-categories>Delete</button>
              <button class="btn btn-primary pull-right" @click="save">Save Category</button>
            </div>
          </div>
          <div class="card-block">
            <category-form ref="categoryForm" :category="category"></category-form>
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
  name: 'editCategories',
  components: {
    CategoryForm
  },
  data() {
    return {
      category: {},
    };
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    }
  },
  watch: {
    id: 'load'
  },
  methods: {
    load() {
      // $FlowFixMe
      this.$store.dispatch(Constants.GET_CATEGORY, {
        id: this.id,
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
            category.id = this.id;
            // $FlowFixMe
            this.$store.dispatch(Constants.UPDATE_CATEGORY, {
              category
            });
          }
        });
    },
    deleteConfirm() {
      /* eslint-disable no-alert */
      if (window.confirm('Are you sure you want to delete?')) {
        this.delete();
      }
      /* eslint-enable no-alert */
    },

    delete() {
      // $FlowFixMe
      this.$store.dispatch(Constants.DELETE_CATEGORY, {
        id: this.id,
        rowVersion: this.category.rowVersion,
        redirect: this.redirect,
      });
    },
  },
  mounted() {
    this.$store.watch(
      () => this.$store.getters.category(this.id),
      (current) => {
        this.category = Object.assign({}, this.category, current);
      }
    );
    this.load();
  }
};
</script>
