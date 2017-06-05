<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Locations
            <div class="card-actions">
              <router-link class="btn" :to="{path: '/locations/add'}"><i class="fa fa-plus"></i>Add</router-link>
            </div>
          </div>
          <div class="card-block">
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
