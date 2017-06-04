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
            <router-link class="btn btn-primary" :to="{path: '/vendors/add'}">Add New Vendor</router-link>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-culture"></i>
          </div>
          <div class="header-title">
            <h3>Vendors</h3>
            <small>Find all vendors</small>
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
            <vendor-list></vendor-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
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
