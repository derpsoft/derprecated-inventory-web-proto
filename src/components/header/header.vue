<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <div id="mobile-menu">
          <div class="left-nav-toggle">
            <a href="#">
              <i class="stroke-hamburgermenu"></i>
            </a>
          </div>
        </div>
        <a class="navbar-brand" href="#" v-link="{ path: '/' }">
          DERP
          <span>v.1.0</span>
        </a>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <div class="left-nav-toggle">
          <a href="">
            <i class="stroke-hamburgermenu"></i>
          </a>
        </div>
        <!-- <form class="navbar-form navbar-left">
          <input type="text" class="form-control" placeholder="Search data for analysis" style="width: 175px">
        </form> -->
        <ul class="nav navbar-nav navbar-right">
          <li class="dropdown">
            <a href="versions.html" >Versions
              <span class="label label-warning pull-right">1</span>
            </a>
          </li>
          <li class=" profil-link">
            <a href="#" v-link="{ path: 'profile' }">
              <span class="profile-address">services@jlconcept.com</span>
              <img src="/static/img/profile.jpg" class="img-circle" alt="">
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

export default {};

</script>

<style scoped></style>
