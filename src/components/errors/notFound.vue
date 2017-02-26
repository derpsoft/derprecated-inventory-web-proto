<template>
<section class="content">
  <div class="container-center md animated slideInDown">
    <div class="view-header">
      <div class="header-icon">
        <i class="pe page-header-icon pe-7s-close-circle"></i>
      </div>
      <div class="header-title">
        <h3>404</h3>
        <small>
        Page Not Found!
      </small>
      </div>
    </div>

    <div class="panel panel-filled panel-c-warning">
      <div class="panel-body text-warning">
        <h2><i class="fa fa-warning"></i> OH NO!  YOU'VE DERPED. </h2>
        <p>This page was not found.</p>
        <p>Return to safety by clicking the button below.</p>
      </div>
    </div>
    <div>
      <router-link :to="{path: '/'}" class="btn btn-accent">Back to app</router-link>
    </div>
  </div>
</section>
</template>

<script>
export default {
  name: 'notFound',
};
</script>

<style scoped>
.content {
  margin-left: auto;
  margin-right: auto;
}
</style>
