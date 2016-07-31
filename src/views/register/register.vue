<template>
  <section class="content">
    <div class="container-center lg animated slideInDown">
      <div class="view-header">
        <div class="header-icon">
          <i class="pe page-header-icon pe-7s-add-user"></i>
        </div>
        <div class="header-title">
          <h3>Register</h3>
          <small>
              Please enter your data to register.
          </small>
        </div>
      </div>
      <div class="panel panel-filled">
        <div class="panel-body">
          <p>
          </p>
          <registration-form></registration-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import RegistrationForm from '../../components/registrationForm/registrationForm.vue';

  class Register {
    constructor() {
      this.components = {
        RegistrationForm,
      };
    }
  }
  export default new Register;
</script>

<style>
  .content {
    margin-left: auto;
    margin-right: auto;
  }
</style>