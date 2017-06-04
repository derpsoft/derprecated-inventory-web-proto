<template>
  <main class="main">
  <ol class="breadcrumb">
    <li class="breadcrumb-item">Home</li>
    <li class="breadcrumb-item"><a href="#">Inventory</a>
    </li>
  </ol>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-primary" :to="{path: '/categories/add'}">Add New Category</router-link>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-culture"></i>
          </div>
          <div class="header-title">
            <h3>Categories</h3>
            <small>Find all categories</small>
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
            <category-list></category-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
</template>

<script>
// @flow
import Constants from 'src/constants';
import Search from 'components/search';
import CategoryList from './list';

export default {
  name: 'categories',
  components: {
    CategoryList,
    Search,
  },

  data() {
    return {
      // $FlowFixMe
      searchAction: Constants.SEARCH_CATEGORIES,
      // $FlowFixMe
      listAction: Constants.GET_CATEGORIES,
      // $FlowFixMe
      clearAction: Constants.CLEAR_CATEGORY_SEARCH,
    };
  },
};
</script>
