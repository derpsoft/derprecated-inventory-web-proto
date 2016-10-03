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
          <tr v-for="user in users" v-on:click.prevent="editUser(user.id)">
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
        users: null,
        items: [],
        pagination: {
          per_page: defaultPageCount,    // required
          current_page: 1, // required
          last_page: 1,    // required
          to: defaultPageCount           // required
        },
      };
    },
    components: {
      Pagination,
      PageSize,
      UserSearch,
    },
    created() {
      this.$store.dispatch(Constants.GET_USER_LIST, { skip: 0, take: defaultPageCount });
    },
    computed: {
      users() {
        // TODO: Calculate Total Page Size
        this.pagination.last_page = store.state.userList.list;
        return store.state.userList.list;
      },
    },
    methods: {
      editUser() {
      },
      getPage() {
        const skip = this.pagination.per_page * (this.pagination.current_page - 1);
        this.$store.dispatch(Constants.GET_USER_LIST, {
          skip,
          take: this.pagination.per_page
        });
      },
      setPageSize(pageSize) {
        this.pagination.per_page = pageSize;

        this.$store.dispatch(Constants.GET_USER_LIST, {
          skip: 0,
          take: pageSize,
        });
      },
    },
  };
</script>
