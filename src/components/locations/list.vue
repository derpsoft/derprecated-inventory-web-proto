<style lang="css" scoped>
.table {
  tr{
    cursor: pointer;
  }
}
</style>

<template>
<div>
  <div v-if="!locations.length">
    There are no locations found. Please add locations or update the filters.
  </div>

  <table class="table table-bordered table-striped table-condensed table-hover" v-else>
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
  <!--<ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Prev</a></li>
    <li class="page-item active">
      <a class="page-link" href="#">1</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">4</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>-->
  </div>
</template>

<script>
// @flow
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
    edit(id: number) {
      this.$router.push(`/locations/edit/${id}`);
    },
  },
};
</script>
