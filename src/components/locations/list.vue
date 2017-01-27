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
              <th>Shelf</th>
              <th>Rack</th>
              <th>Bin</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="location in locations" @click.prevent="edit(location.id)">
              <td>{{location.id}}</td>
              <td>{{location.name}}</td>
              <td>{{location.shelf}}</td>
              <td>{{location.rack}}</td>
              <td>{{location.bin}}</td>
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
export default {
  computed: {
    locations() {
      const results = this.$store.getters.locationSearch;
      if (results.length) {
        return results;
      }
      return this.$store.getters.locations;
    },
  },
  methods: {
    edit(id) {
      this.$router.push(`/locations/edit/${id}`);
    },
  },
};
</script>
