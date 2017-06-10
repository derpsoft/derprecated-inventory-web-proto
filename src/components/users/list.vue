<template>
<div>
  <div v-if="!users.length">
    There are no users found. Please add users or update the filters.
  </div>
  <crud-list :records="users" :columns="['id', 'email', 'firstName', 'lastName', 'phoneNumber']" v-else></crud-list>
</div>

</template>

<script>
import CrudList from 'components/crud/list';

export default {
  components: {
    CrudList
  },

  computed: {
    users() {
      const results = this.$store.getters.userSearch;
      if (results.length) {
        return results;
      }
      return this.$store.getters.users;
    },
  },
};

</script>
