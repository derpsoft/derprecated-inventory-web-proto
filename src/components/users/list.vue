<template>
<div>
  <div class="col-md-12">
    <user-search></user-search>
  </div>
  <div class="col-xs-6 text-left">
    <page-size :callback="setPageSize" :page-size="25"></page-size>
  </div>
  <div class="col-xs-6 text-right">
    <pagination :pagination="pagination" :callback="getPage"></pagination>
  </div>
  <div class="col-md-12">
    <div class="table-responsive">
      <table class="table table-striped table-hover user-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" @click.prevent="editUser(user.id)">
            <td>{{user.id}}</td>
            <td>{{user.firstName}}</td>
            <td>{{user.lastName}}</td>
            <td>{{user.email}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<style lang="less" scoped>
table.user-list {
    tr {
        cursor: pointer;
    }
}
</style>

<script>
import Pagination from 'vue-bootstrap-pagination';
import Constants from '../../constants';
import PageSize from '../pageSize/pageSize.vue';
import UserSearch from './search.vue';
import store from '../../stores/store';

const defaultPageCount = 25;

export default {
  data() {
    return {
      pagination: {
        per_page: defaultPageCount, // required
        current_page: 1, // required
        last_page: 1, // required
        to: 0, // required
      },
    };
  },
  components: {
    Pagination,
    PageSize,
    UserSearch,
  },
  mounted() {
    this.$store.dispatch(Constants.GET_USERS, {
      skip: 0,
      take: defaultPageCount
    });
  },
  computed: {
    users() {
      const list = store.getters.users;
      const count = list.length;

      this.pagination.last_page = Math.ceil(count / this.pagination.per_page);
      this.pagination.to = count;

      return list;
    },
  },
  methods: {
    editUser(id) {
      this.$router.push(`/users/edit/${id}`);
    },
    getPage() {
      const skip = this.pagination.per_page * (this.pagination.current_page - 1);
      this.$store.dispatch(Constants.GET_USERS, {
        skip,
        take: this.pagination.per_page
      });
    },
    setPageSize(pageSize) {
      this.pagination.per_page = pageSize;
      this.pagination.current_page = 1;

      this.$store.dispatch(Constants.GET_USERS, {
        skip: 0,
        take: pageSize,
      });
    },
  },
};
</script>
