<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover user-list">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>User Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" v-on:click="editUser(user.id)">
          <td>{{user.id}}</td>
          <td>{{user.firstName}}</td>
          <td>{{user.lastName}}</td>
          <td>{{user.userName}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="less" scoped>
  table.user-list {
    tr {
      cursor: pointer;
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        users:  null,
      },
    },
    created() {
      const headers = new Headers();
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');

      fetch(`${API_ROOT}users`, {
        method: 'GET',
        mode: 'cors',
        headers,
      })
      .then((res) => {
        this.users = res.json().users;
        console.log(this.users);
      });
    }
  };
</script>
