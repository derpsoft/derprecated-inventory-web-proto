<style scoped>
.btn-secondary,
.btn-primary {
  margin-top: 30px;
  padding: 12px 20px;
  font-size: 1.2em;
  margin-right: 10px;

  .fa {
    margin-right: 10px;
  }
}
</style>

<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="clearfix">
            <h1 class="float-left display-3 mr-2">403</h1>
            <h4 class="pt-1">Not Authorized.</h4>
            <p class="text-muted">Please try again or login with a different account.</p>
          </div>
          <div class="row">
            <div class="col-6">
              <router-link :to="{path: '/'}" class="btn btn-primary btn-block"><i class="fa fa-refresh"></i> Retry</router-link>
            </div>
            <div class="col-6">
              <router-link :to="{path: '/'}" class="btn btn-secondary btn-block"><i class="fa fa-sign-out"></i> Logout</router-link>
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
export default {
  name: 'notAuthorized',
};
</script>
