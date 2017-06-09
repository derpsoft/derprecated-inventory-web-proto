<template>
<div>
  <table class="table table-hover table-striped">
    <thead>
      <tr>
        <th>Item</th>
        <th>Quantity</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  name: 'new-inventory',

  computed: {
    inventory() {
      return this.$store.getters.newInventory;
    },
  },
};
</script>
