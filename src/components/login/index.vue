<style scoped>
.content {
  width: 400px;
  margin: 0 auto;
  padding: 0;
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
<template>
 <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card-group mb-0">
            <div class="card p-2">
              <div class="card-block">
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <div class="row">
                  <div class="col-12">
                    <login-form></login-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
// @flow
import loginForm from './form';

export default {
  name: 'login',
  components: {
    loginForm,
  },
};
</script>
