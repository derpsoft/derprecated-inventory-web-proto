<template>
<div>
  <div class="col-md-12" v-if="!categories.length">
    There were no categories found. Please add categories or update the filters.
  </div>
  <div class="col-md-12">
    <div class="table-responsive">
      <table class="table table-striped table-hover category-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr @click.prevent="edit(category.id)" v-for="category in categories">
            <td>{{category.id}}</td>
            <td>{{category.name}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<style lang="less" scoped>
table.category-list {
    tr {
        cursor: pointer;
    }
}
</style>

<script>
import Constants from '../../constants';

export default {
  mounted() {
    this.$store.dispatch(Constants.GET_CATEGORIES, {
      skip: 0,
      take: 200,
    });
    this.$store.dispatch(Constants.COUNT_CATEGORIES);
  },
  computed: {
    count() {
      return this.$store.getters.categoryCount;
    },
    categories() {
      const categories = this.$store.getters.categories;

      return categories;
    },
  },
  methods: {
    edit(id) {
      this.$router.push(`/categories/edit/${id}`);
    },
  },
};
</script>
