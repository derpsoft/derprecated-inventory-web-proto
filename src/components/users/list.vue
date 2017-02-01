<style lang="less" scoped>
table.user-list {
  tr {
    cursor: pointer;
  }
}
</style>

<template>
<div>
  <div v-if="!users.length" class="col-md-12">
    There are no users found. Please add users or update the filters.
  </div>
  <div class="list-view">
    <div class="table-responsive">
      <table class="table table-striped table-hover user-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" @click.prevent="edit(user.id)">
            <td>{{user.id}}</td>
            <td>{{user.firstName}}</td>
            <td>{{user.lastName}}</td>
            <td>{{user.email}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
export default {
  computed: {
    users() {
      const results = this.$store.getters.userSearch;
      if (results.length) {
        return results;
      }
      return this.$store.getters.users;
    },
  },

  methods: {
    edit(id) {
      this.$router.push(`/users/edit/${id}`);
    },
  },
};
</script>
