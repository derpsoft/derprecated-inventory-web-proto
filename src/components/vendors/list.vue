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
            <tr @click.prevent="edit(vendor.id)" v-for="vendor in vendors">
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

<style lang="less" scoped>
table.vendor-list {
    tr {
        cursor: pointer;
    }
}
</style>

<script>
import vendorSearch from './search.vue';
import Constants from '../../constants';

export default {
  components: {
    vendorSearch,
  },
  mounted() {
    this.$store.dispatch(Constants.GET_VENDORS, {
      skip: 0,
      take: 200,
    });
    this.$store.dispatch(Constants.COUNT_VENDORS);
  },
  computed: {
    count() {
      return this.$store.getters.vendorCount;
    },
    vendors() {
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
