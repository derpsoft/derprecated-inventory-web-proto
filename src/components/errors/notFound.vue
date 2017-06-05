<style scoped>
.btn-primary {
  margin-top: 30px;
  padding: 12px 0;
  font-size: 1.2em;

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
            <h1 class="float-left display-3 mr-2">404</h1>
            <h4 class="pt-1">Oops! You're lost.</h4>
            <p class="text-muted">The page you are looking for was not found.</p>
          </div>
              <router-link :to="{path: '/'}" class="btn btn-primary btn-block"><i class="fa fa-reply"></i> Back to app</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @flow
export default {
  name: 'notFound',
};
</script>

