<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-users"></i>
          </div>
          <div class="header-title">
            <h3>Users</h3>
            <small>Find all users</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-filled panel-main">
          <div class="panel-body">
            <search :searchActionName="searchAction" :listActionName="listAction" :clearActionName="clearAction"></search>
            <user-list></user-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import Constants from 'src/constants';
import Search from 'components/search';
import UserList from './list';

export default {
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
