<template>
<div>
  <div class="row control-row">
    <div class="col-md-12">
      <button type="submit" class="btn btn-primary pull-right" @click="save">Receive</button>
      <h4>Receive Inventory</h4>
    </div>
  </div>
  <inventory-form ref="inventoryForm"></inventory-form>
</div>
</template>

<script>
import Constants from '../../constants';
import InventoryForm from './form.vue';

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
            this.$store.dispatch(Constants.RECEIVE_INVENTORY, {
              transaction,
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
