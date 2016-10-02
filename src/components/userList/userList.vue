<template>
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
            <th>User Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" v-on:click="editUser(user.id)">
            <td>{{user.id}}</td>
            <td>{{user.firstName}}</td>
            <td>{{user.lastName}}</td>
            <td>{{user.userName}}</td>
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
  import Pagination from 'vue-bootstrap-pagination';
  import store from '../../stores/store';

  export default {
    data() {
      return {
        users: null,
        items: [],
        pagination: {
          per_page: 25,    // required
          current_page: 1, // required
          last_page: 2,    // required
          to: 25           // required
        },
      };
    },
    components: {
      Pagination,
      PageSize,
    },
    created() {
      this.$store.dispatch(Constants.GET_USER_LIST, { skip: 0, take: 25 });
    },
    computed: {
      users() {
        return store.state.usersList.list;
      },
    },
    methods: {
      editUser() {
      },
      getPage() {
        this.$store.dispatch(Constants.GET_USER_LIST, { skip: 0, take: 25 });
      },
      setPageSize(pageSize) {
        this.$store.dispatch(Constants.GET_USER_LIST, {
          skip: 0,
          take: pageSize,
        });
      },
    },
  };
</script>
