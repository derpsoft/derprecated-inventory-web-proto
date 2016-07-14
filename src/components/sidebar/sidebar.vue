<template>
  <aside class="navigation">
    <nav>
      <ul class="nav luna-nav">
        <li class="nav-category">
          Main
        </li>
        <li class="active">
          <a href="#" v-href="{ path: 'dashboard'}">Dashboard</a>
        </li>
        <li>
          <a href="#monitoring" data-toggle="collapse" aria-expanded="false">
            Monitoring<span class="sub-nav-icon"> <i class="stroke-arrow"></i> </span>
          </a>
          <ul id="monitoring" class="nav nav-second collapse">
            <li><a href="#"> Metrics</a></li>
            <li><a href="#"> Usage</a></li>
            <li><a href="#"> Activity</a></li>
          </ul>
        </li>
        <li class="nav-category">
          UI Elements
        </li>
        <li>
          <a href="#uielements" data-toggle="collapse" aria-expanded="false">
            General<span class="sub-nav-icon"> <i class="stroke-arrow"></i> </span>
          </a>
          <ul id="uielements" class="nav nav-second collapse">
            <li><a href="#">Panels</a></li>
            <li><a href="#">Typography</a></li>
            <li><a href="#">Icons</a></li>
            <li><a href="#">Buttons</a></li>
            <li><a href="#">Tabs</a></li>
            <li><a href="#">Modals</a></li>
            <li><a href="#">Alerts</a></li>
            <li><a href="#">Grid system</a></li>
            <li><a href="#">Draggable</a></li>
          </ul>
        </li>
        <li>
          <a href="#tables" data-toggle="collapse" aria-expanded="false">
            Tables design<span class="sub-nav-icon"> <i class="stroke-arrow"></i> </span>
          </a>
          <ul id="tables" class="nav nav-second collapse">
            <li><a href="#">Table styles</a></li>
            <li><a href="#">Data Tables</a></li>
          </ul>
        </li>
        <li>
          <a href="#"> Form elements </a>
        </li>
        <li>
          <a href="#charts" data-toggle="collapse" aria-expanded="false">
            Charts and graphs<span class="sub-nav-icon"> <i class="stroke-arrow"></i> </span>
          </a>
          <ul id="charts" class="nav nav-second collapse">
            <li><a href="#">Flot charts</a></li>
            <li><a href="#">Sparkline</a></li>
          </ul>
        </li>
        <li class="nav-category">
          App Pages
        </li>
        <li>
          <a href="#extras" data-toggle="collapse" aria-expanded="false">
            Basic <span class="sub-nav-icon"> <i class="stroke-arrow"></i> </span>
          </a>
          <ul id="extras" class="nav nav-second collapse">
            <li><a href="#">Profile</a></li>
            <li><a href="#">Support</a></li>
            <li><a href="#">List</a></li>
            <li><a href="#">Timeline</a></li>
          </ul>
        </li>
        <li>
          <a href="#common" data-toggle="collapse" aria-expanded="false">
            Common <span class="sub-nav-icon"> <i class="stroke-arrow"></i> </span>
          </a>
          <ul id="common" class="nav nav-second collapse">
            <li><a href="#">Login</a></li>
            <li><a href="#">Register</a></li>
            <li><a href="#">Forgot password</a></li>
            <li><a href="#">Error page</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            <span class="badge pull-right">2</span>
            Versions
          </a>
        </li>
        <li class="nav-info">
          <i class="pe pe-7s-shield text-accent"></i>
          <div class="m-t-xs">
            <span class="c-white">LUNA</span> admin theme with Dark UI style for monitoring and administration web applications.
          </div>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {

};
</script>
