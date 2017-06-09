<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
           Users
            <div class="card-actions">
              <router-link class="btn" :to="{path: '/orders/add'}"><i class="fa fa-plus"></i>Add</router-link>
            </div>
          </div>
          <div class="card-block">
            <search :searchActionName="searchAction" :listActionName="listAction" :clearActionName="clearAction"></search>
            <user-list></user-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Constants from 'src/constants';
import Search from 'components/search';
import UserList from './list';

export default {
  name: 'users',
  components: {
    UserList,
    Search,
  },

  data() {
    return {
      searchAction: Constants.SEARCH_USERS,
      listAction: Constants.GET_USERS,
      clearAction: Constants.CLEAR_USER_SEARCH,
    };
  },
};
</script>
