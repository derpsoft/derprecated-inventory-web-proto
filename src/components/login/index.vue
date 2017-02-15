<template>
<section class="content" id="login">
  <div class="container-center">
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
import loginForm from './form';

export default {
  name: 'loginView',
  components: {
    loginForm,
  },
};
</script>

<style scoped>
.content {
  width: 400px;
  margin: 0 auto;
  padding:0;
  height: 100%;
}

.container-center {
  position: absolute;
  top: 50%;
  width: 100%;
  height: 360px;
  padding: 0;
  margin: 0;
  margin-top: -180px;
}

</style>
