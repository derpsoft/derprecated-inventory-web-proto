<style lang="css" scoped>
table.category-list {
  tr {
    cursor: pointer;
  }
}
</style>

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
          <tr v-for="category in categories" @click.prevent="edit(category.id)">
            <td>{{category.id}}</td>
            <td>{{category.name}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
export default {
  computed: {
    categories() {
      const results = this.$store.getters.categorySearch;
      if (results.length) {
        return results;
      }
      return this.$store.getters.categories;
    },
  },
  methods: {
    edit(id) {
      this.$router.push(`/categories/edit/${id}`);
    },
  },
};
</script>
