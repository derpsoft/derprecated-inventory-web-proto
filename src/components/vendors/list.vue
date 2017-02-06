<style lang="less" scoped>
table.vendor-list {
    tr {
        cursor: pointer;
    }
}
</style>

<template>
<div>
  <div class="col-md-12" v-if="!vendors.length">
    There were no vendors found. Please add vendors or update the filters.
  </div>
  <div>
    <div class="col-md-12">
      <div class="table-responsive">
        <table class="table table-striped table-hover vendor-list">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="vendor in vendors" @click.prevent="edit(vendor.id)">
              <td>{{vendor.id}}</td>
              <td>{{vendor.name}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  computed: {
    vendors() {
      const results = this.$store.getters.vendorSearch;
      if (results.length) {
        return results;
      }
      return this.$store.getters.vendors;
    },
  },
  methods: {
    edit(id) {
      this.$router.push(`/vendors/edit/${id}`);
    },
  },
};
</script>
