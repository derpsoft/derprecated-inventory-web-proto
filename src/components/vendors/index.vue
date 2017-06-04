<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Vendors
            <div class="card-actions">
              <router-link class="btn" :to="{path: '/vendors/add'}"><i class="fa fa-plus"></i>Add New Vendor</router-link>
            </div>
          </div>
          <div class="card-block">
            <search :searchActionName="searchAction" :listActionName="listAction" :clearActionName="clearAction"></search>
            <vendor-list></vendor-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Constants from 'src/constants';
import Search from 'components/search';
import VendorList from './list';

export default {
  name: 'vendors',
  components: {
    VendorList,
    Search,
  },

  data() {
    return {
      searchAction: Constants.SEARCH_VENDORS,
      listAction: Constants.GET_VENDORS,
      clearAction: Constants.CLEAR_VENDOR_SEARCH,
    };
  },
};
</script>
