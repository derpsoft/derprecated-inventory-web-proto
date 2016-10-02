<template>
<section class="content" id="login">
  <div class="container-center animated slideInDown">
    <div class="view-header">
      <div class="header-icon">
        <i class="pe page-header-icon pe-7s-unlock"></i>
      </div>
      <div class="header-title">
        <h3>Login</h3>
        <small>
            Please enter your credentials to login.
        </small>
    </div>
  </div>
  <div class="panel panel-filled">
    <div class="panel-body">
      <login-form></login-form>
    </div>
  </div>
</div>
</section>
</template>

<script>
import loginForm from '../../components/loginForm/loginForm.vue';

export default {
  components: {
    loginForm,
  },
};
</script>

<style scoped>
  .content {
    margin-left: auto;
    margin-right: auto;
  }
</style>
