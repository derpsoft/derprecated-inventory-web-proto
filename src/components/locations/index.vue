<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
            <router-link class="btn btn-secondary" :to="{path: '/locations/add'}">Add New Location</router-link>
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
      // $FlowFixMe
      searchAction: Constants.SEARCH_LOCATIONS,
      // $FlowFixMe
      listAction: Constants.GET_LOCATIONS,
      // $FlowFixMe
      clearAction: Constants.CLEAR_LOCATION_SEARCH,
    };
  },
};
</script>
