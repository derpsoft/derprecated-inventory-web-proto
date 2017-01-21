<template>
<aside class="navigation">
  <nav>
    <ul class="nav luna-nav">
      <li class="nav-category">
        General
      </li>
      <li>
        <router-link :to="{ path: '/', activeClass: 'active' }" active-class="active">Dashboard</router-link>
      </li>
      <li>
        <router-link :to="{ path: '/inventory', activeClass: 'active' }" active-class="active">Inventory</router-link>
      </li>
      <li>
        <router-link :to="{ path: '/reports', activeClass: 'active' }" active-class="active">Reports</router-link>
      </li>

      <li class="nav-category" v-can-any="{ term: 'or', guards: ['canReadProducts', 'canReadCategories', 'canReadWarehouses', 'canReadLocations', 'canReadVendors', 'canReadUsers'] }">
        Admin
      </li>
      <li v-can-read-products>
        <router-link :to="{ path: '/products', activeClass: 'active'}" active-class="active">Products</router-link>
      </li>
      <li v-can-read-categories v-is-dev>
        <router-link :to="{ path: '/categories', activeClass: 'active'}" active-class="active">Categories</router-link>
      </li>
      <li v-can-read-warehouses>
        <router-link :to="{ path: '/warehouses', activeClass: 'active'}" active-class="active">Warehouses</router-link>
      </li>
      <li v-can-read-locations v-is-dev>
        <router-link :to="{ path: '/locations', activeClass: 'active'}" active-class="active">Locations</router-link>
      </li>
      <li v-can-read-vendors>
        <router-link :to="{ path: '/vendors', activeClass: 'active'}" active-class="active">Vendors</router-link>
      </li>
      <li v-can-read-users>
        <router-link :to="{ path: '/users', activeClass: 'active'}" active-class="active">Users</router-link>
      </li>

      <li class="nav-category">
        Account
      </li>
      <li>
        <router-link :to="{ path: '/profile', activeClass: 'active'}" active-class="active">Profile</router-link>
      </li>
      <li>
        <router-link :to="{ path: '/logout', activeClass: 'active'}" active-class="active">Logout</router-link>
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
