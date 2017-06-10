<style lang="css" scoped>
</style>
<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Dispatch Inventory
            <div class="card-actions">
            <router-link class="btn btn-w-md btn-accent btn-return" :to="{path: '/inventory'}">Back to Inventory</router-link>
              <button type="submit" class="btn btn-primary pull-right" @click="save">Dispatch</button>
            </div>
          </div>
          <div class="card-block">
            <inventory-form ref="inventoryForm" default-location-name="Shipping"></inventory-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @flow
import Constants from 'src/constants';
import InventoryForm from './form';

export default {
  components: {
    InventoryForm
  },

  methods: {
    save() {
      this.validate()
        .then(({
          isValid,
          transaction
        }) => {
          if (isValid) {
            const redirect = this.redirect;
            // $FlowFixMe
            this.$store.dispatch(Constants.CREATE_INVENTORY_TRANSACTION, {
              transaction: {
                ...transaction,
                quantity: -Math.abs(transaction.quantity),
              },
              redirect
            });
          }
        });
    },
    validate() {
      return this.$refs.inventoryForm.validate();
    },
    redirect() {
      this.$router.push({
        path: '/inventory'
      });
    },
  },
};
</script>
