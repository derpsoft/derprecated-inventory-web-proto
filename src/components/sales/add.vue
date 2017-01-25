<template>
<div>
  <div class="row control-row">
    <div class="col-md-12">
      <button class="btn btn-primary pull-right" @click="save">Save</button>
      <h4>Sale Details</h4>
    </div>
  </div>
  <div class="panel panel-filled panel-main">
    <div class="panel-body">
      <sale-form ref="saleForm"></sale-form>
    </div>
  </div>
</div>
</template>

<script>
import Constants from '../../constants';
import SaleForm from './form.vue';

export default {
  components: {
    SaleForm
  },
  data() {
    return {};
  },
  methods: {
    redirect() {
      this.$router.push({
        path: '/sales'
      });
    },
    save() {
      this.$refs.saleForm.validate()
        .then(({
          isValid,
          sale
        }) => {
          if (isValid) {
            const redirect = this.redirect;

            sale.id = this.id;
            this.$store.dispatch(Constants.CREATE_SALE, {
              sale,
              redirect,
            });
          }
        });
    }
  }
};
</script>
