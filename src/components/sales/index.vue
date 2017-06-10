<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            Add Sales
            <div class="card-actions">
              <router-link class="btn btn-w-md btn-accent" :to="{path: '/sales/add'}">Add New Sale</router-link>
            </div>
          </div>
          <div class="card-block">
            <search :searchActionName="searchAction" :listActionName="listAction" :clearActionName="clearAction"></search>
            <sale-list></sale-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Constants from 'src/constants';
  import Search from 'components/search';
  import SaleList from './list';

  export default {
    name: 'sales',
    data() {
      return {
        searchAction: Constants.SEARCH_SALES,
        listAction: Constants.GET_SALES,
        clearAction: Constants.CLEAR_SALE_SEARCH,
      };
    },

    components: {
      SaleList,
      Search,
    },
  };
</script>
