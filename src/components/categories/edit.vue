<template>
<div>
  <div class="row control-row">
    <div class="col-md-12">
      <button type="button" class="btn btn-danger" @click="deleteConfirm" v-can-delete-categories>Delete</button>
      <button class="btn btn-primary pull-right" @click="save">Save Category</button>
      <h4>Category Details</h4>
    </div>
  </div>
  <div class="panel panel-filled panel-main">
    <div class="panel-body">
      <category-form ref="categoryForm" :category="category"></category-form>
    </div>
  </div>
</div>

</template>

<script>
import Constants from 'src/constants';
import CategoryForm from './form';

export default {
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
