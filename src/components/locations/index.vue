<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-w-md btn-accent" :to="{path: '/locations/add'}">Add New Location</router-link>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-home"></i>
          </div>
          <div class="header-title">
            <h3>Locations</h3>
            <small>Find all locations</small>
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
            <location-list></location-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
// @flow
import Search from 'components/search';
import Constants from 'src/constants';
import LocationList from './list';

export default {
  name: 'location',
  components: {
    LocationList,
    Search,
  },

  data() {
    return {
      searchAction: Constants.SEARCH_LOCATIONS,
      listAction: Constants.GET_LOCATIONS,
      clearAction: Constants.CLEAR_LOCATION_SEARCH,
    };
  },
};
</script>
