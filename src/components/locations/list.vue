<template>
<div>
  <div v-if="!locations.length" class="col-md-12">
    There are no locations found. Please add locations or update the filters.
  </div>
  <div class="list-view">
    <div class="col-md-12">
      <div class="table-responsive">
        <table class="table table-striped table-hover location-list">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="location in locations" @click.prevent="edit(location.id)">
              <td>{{location.id}}</td>
              <td>{{location.name}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="less" scoped>
table.location-list {
    tr {
        cursor: pointer;
    }
}
</style>

<script>
import Constants from '../../constants';

export default {
  mounted() {
    this.$store.dispatch(Constants.GET_LOCATIONS, {
      skip: 0,
      take: 200,
    });
  },
  computed: {
    count() {
      return this.$store.getters.locationCount;
    },
    locations() {
      return this.$store.getters.locationList;
    },
  },
  methods: {
    edit(id) {
      this.$router.push(`/locations/edit/${id}`);
    },
  },
};
</script>
