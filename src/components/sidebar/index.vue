<template>
<aside class="navigation">
  <nav>
    <ul class="nav luna-nav">
      <li class="nav-category">
        General
      </li>
      <li>
        <router-link :to="{ path: '/', activeClass: 'active', exact: true}" active-class="active" exact="true">Dashboard</router-link>
      </li>
      <li>
        <router-link :to="{ path: '/inventory', activeClass: 'active', exact: true }" active-class="active">Inventory</router-link>
      </li>
      <li>
        <router-link :to="{ path: '/reports', activeClass: 'active', exact: true }" active-class="active">Reports</router-link>
      </li>
      <li class="nav-category">
        Admin
      </li>

      <li v-canReadProducts>
        <router-link :to="{ path: '/products', activeClass: 'active'}" active-class="active">Products</router-link>
      </li>
      <li v-canReadCategories>
        <router-link :to="{ path: '/categories', activeClass: 'active'}" active-class="active">Categories</router-link>
      </li>
      <li v-canReadWarehouses>
        <router-link :to="{ path: '/warehouses', activeClass: 'active'}" active-class="active">Warehouses</router-link>
      </li>
      <li v-canReadVendors>
        <router-link :to="{ path: '/vendors', activeClass: 'active'}" active-class="active">Vendors</router-link>
      </li>
      <li v-canReadUsers>
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
