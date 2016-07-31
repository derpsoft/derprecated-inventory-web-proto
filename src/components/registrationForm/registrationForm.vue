<template>
<form action="index.html" id="loginForm" novalidate>
    <div class="row">
        <div class="form-group col-lg-6">
            <label>Username</label>
            <input type="" value="" id="username" class="form-control" name="" placeholder="User Name" tabindex="0">
            <span class="help-block small">Your unique username to app</span>
        </div>
        <div class="form-group col-lg-6">
            <label>Password</label>
            <input type="password" value="" id="password" class="form-control" name="" placeholder="Password" tabindex="0">
            <span class="help-block small">Your hard to guess password</span>
        </div>
        <div class="form-group col-lg-6">
            <label>Repeat Password</label>
            <input type="password" value="" id="repeatpassword" class="form-control" name="" placeholder="Repeat Password" tabindex="0">
            <span class="help-block small">Please repeat your pasword</span>
        </div>
        <div class="form-group col-lg-6">
            <label>Email Address</label>
            <input type="" value="" id="email" class="form-control" name="" placeholder="Email" tabindex="0">
            <span class="help-block small">Your address email to contact</span>
        </div>
    </div>
    <div>
        <button class="btn btn-accent">Register</button>
        <a class="btn btn-default" href="#" v-link="{ path: 'login' }">Login</a>
    </div>
</form>
</template>

<script>
    export default {};
</script>