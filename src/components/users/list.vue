<template>
<div>
  <div v-if="!users.length" class="col-md-12">
    There are no users found. Please add users or update the filters.
  </div>

  <crud-list :records="users" :columns="['id', 'email', 'firstName', 'lastName', 'phoneNumber']"></crud-list>
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
