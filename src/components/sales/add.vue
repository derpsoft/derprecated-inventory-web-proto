<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Add Sales
            <div class="card-actions">
              <router-link class="btn btn-w-md btn-accent btn-return" :to="{path: '/sales'}">Back to Sales</router-link>
              <button class="btn btn-primary pull-right" @click="save">Save</button>
            </div>
          </div>
          <div class="card-block">
            <sale-form ref="saleForm"></sale-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Constants from 'src/constants';
import SaleForm from './form';

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
