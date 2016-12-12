<template>
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
</template>

<style lang="less" scoped>
  table.user-list {
    tr {
      cursor: pointer;
    }
  }
</style>

<script>
  import Constants from '../../constants';
  import PageSize from '../../components/pageSize/pageSize.vue';
  import UserSearch from '../../components/userSearch/userSearch';
  import Pagination from 'vue-bootstrap-pagination';
  import store from '../../stores/store';

  const defaultPageCount = 25;

  export default {
    data() {
      return {
        count: null,
        users: null,
        pagination: {
          per_page: defaultPageCount,    // required
          current_page: 1, // required
          last_page: 1,    // required
          to: 0,     // required
        },
      };
    },
    components: {
      Pagination,
      PageSize,
      UserSearch,
    },
    created() {
      this.$store.dispatch(Constants.GET_USERS, { skip: 0, take: defaultPageCount });
    },
    computed: {
      users() {
        this.pagination.last_page = Math.ceil(store.state.users.count / this.pagination.per_page);
        this.pagination.to = store.state.users.count;

        return store.state.users.list;
      },
    },
    methods: {
      editUser(id) {
        this.$router.go(`/users/edit/${id}`);
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
