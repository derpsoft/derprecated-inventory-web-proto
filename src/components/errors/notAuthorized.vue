<style scoped>
.content {
  margin-left: auto;
  margin-right: auto;
}
</style>

<template>
<section class="content">
  <div class="container-center md animated slideInDown">
    <div class="view-header">
      <div class="header-icon">
        <i class="pe page-header-icon pe-7s-close-circle"></i>
      </div>
      <div class="header-title">
        <h3>403</h3>
        <small>
        Not Authorized
      </small>
      </div>
    </div>

    <div class="panel panel-filled panel-c-warning">
      <div class="panel-body text-warning">
        <h2><i class="fa fa-warning"></i> OH NO!  YOU'VE DERPED. </h2>
        <p>You're not authorized</p>
        <p>If you've recently registered, it can take up to 24 hours for your account to be approved.</p>

        <a class="btn btn-primary pull-right" href="/">Retry</a>
        <a class="btn btn-link pull-right" href="/logout">Logout</a>
      </div>
    </div>
  </div>
</section>
</template>

<script>
// @flow
export default {
  name: 'notAuthorized',
};
</script>
