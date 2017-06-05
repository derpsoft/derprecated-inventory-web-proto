<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Categories
            <div class="card-actions">
              <router-link class="btn" :to="{path: '/categories/add'}"><i class="fa fa-plus"></i>Add New Category</router-link>
            </div>
          </div>
          <div class="card-block">
            <search :searchActionName="searchAction" :listActionName="listAction" :clearActionName="clearAction"></search>
            <category-list></category-list>
          </div>
        </div>
      </div>
    </div>
  </div>
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
