<template>
<aside class="navigation">
  <nav>
    <ul class="nav luna-nav">
      <li class="nav-category">
        General
      </li>
      <li>
        <router-link :to="{ path: '/', activeClass: 'active', exact: true}">Dashboard</router-link>
      </li>
      <li>
        <router-link :to="{ path: '/inventory', activeClass: 'active', exact: true }">Inventory</router-link>
      </li>
      <li>
        <router-link :to="{ path: '/reports', activeClass: 'active', exact: true }">Reports</router-link>
      </li>
      <li class="nav-category">
        Admin
      </li>
      <li>
        <router-link :to="{ path: '/products', activeClass: 'active'}">Products</router-link>
      </li>
      <li>
        <router-link :to="{ path: '/categories', activeClass: 'active'}">Categories</router-link>
      </li>
      <li>
        <router-link :to="{ path: '/warehouses', activeClass: 'active'}">Warehouses</router-link>
      </li>
      <li>
        <router-link :to="{ path: '/vendors', activeClass: 'active'}">Vendors</router-link>
      </li>
      <li>
        <router-link :to="{ path: '/users', activeClass: 'active'}">Users</router-link>
      </li>
      <li class="nav-category">
        Account
      </li>
      <li>
        <router-link :to="{ path: '/profile', activeClass: 'active'}">Profile</router-link>
      </li>
      <li>
        <router-link :to="{ path: '/logout', activeClass: 'active'}">Logout</router-link>
      </li>
      <li class="nav-info">
        <i class="pe pe-7s-shield text-accent"></i>
        <div class="m-t-xs">
          <span class="c-white">DERP</span> Inventory System.
        </div>
      </li>
    </ul>
  </nav>
</aside>
</template>

<script>
export default {
  name: 'sidebar'
};
</script>
