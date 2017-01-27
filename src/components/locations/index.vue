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
        <search :searchActionName="searchAction" :listActionName="listAction"></search>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <location-list></location-list>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import LocationList from './list.vue';
import Search from '../search.vue';
import Constants from '../../constants';

export default {
  components: {
    LocationList,
    Search,
  },

  data() {
    return {
      searchAction: Constants.SEARCH_LOCATIONS_WITH_TYPEAHEAD,
      listAction: Constants.GET_LOCATIONS,
    };
  },
};
</script>
