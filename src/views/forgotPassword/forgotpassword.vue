<template>
  <div class="container-center animated slideInDown">
    <div class="view-header">
      <div class="header-icon">
        <i class="pe page-header-icon pe-7s-id"></i>
      </div>
      <div class="header-title">
        <h2>Reset password</h2>
        <small>
            Please enter your email to rest your password.
        </small>
      </div>
    </div>
    <div class="panel panel-filled">
      <div class="panel-body">
        <form action="index.html" id="loginForm" novalidate>
          <div class="form-group">
            <label class="control-label" for="email">Email adress</label>
            <input type="text" placeholder="example@gmail.com" title="Please enter you username" required="" value="" name="email" id="email" class="form-control">
            <span class="help-block small">Your address email to sent new password</span>
          </div>
          <div>
            <button class="btn btn-accent">Sent new password</button>
            <a class="btn btn-default" href="#" v-link="{ path: '/' }">Cancel</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {};
</script>
