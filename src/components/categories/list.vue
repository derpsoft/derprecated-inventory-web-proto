<template>
<div>
  <div class="col-md-12">
    <category-search></category-search>
  </div>
  <div v-if="categories && categories.length">
    <div class="col-xs-6 text-left">
      <page-size :callback="setPageSize" :page-size="25"></page-size>
    </div>
    <div class="col-xs-6 text-right">
      <pagination :pagination="pagination" :callback="getPage"></pagination>
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
  <div class="col-md-12" v-if="!categories || categories.length === 0">
    There were no categories found. Please add categories or update the filters.
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
import Pagination from 'vue-bootstrap-pagination';
import categorySearch from './search.vue';
import Constants from '../../constants';
import PageSize from '../../components/pageSize/pageSize.vue';

const defaultPageCount = 25;

export default {
  data() {
    return {
      pagination: {
        per_page: defaultPageCount,
        current_page: 1,
        last_page: 1,
        to: 0,
      },
    };
  },
  components: {
    Pagination,
    PageSize,
    categorySearch,
  },
  mounted() {
    this.$store.dispatch(Constants.GET_CATEGORIES, {
      skip: 0,
      take: defaultPageCount
    });
    this.$store.dispatch(Constants.COUNT_CATEGORIES);
  },
  computed: {
    count() {
      return this.$store.getters.categoryCount;
    },
    categories() {
      const categories = this.$store.getters.categories;

      this.pagination.last_page = Math.ceil(this.count / this.pagination.per_page);
      this.pagination.to = this.count;

      return categories;
    },
  },
  methods: {
    edit(id) {
      this.$router.push(`/categories/edit/${id}`);
    },
    getPage() {
      const skip = this.pagination.per_page * (this.pagination.current_page - 1);
      this.$store.dispatch(Constants.GET_CATEGORIES, {
        skip,
        take: this.pagination.per_page
      });
    },
    setPageSize(pageSize) {
      this.pagination.per_page = pageSize;
      this.pagination.current_page = 1;

      this.$store.dispatch(Constants.GET_CATEGORIES, {
        skip: 0,
        take: pageSize,
      });
    },
  },
};
</script>
