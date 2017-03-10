<style lang="css" scoped>
.luna-nav {
  &.nav {
    padding-top: 0;

    &:first {
      padding-top: 15px;
    }
  }
}
</style>

<template>
<aside class="navigation">
  <nav>
    <ul class="nav luna-nav">
      <li class="nav-category" @click="showGeneral = !showGeneral">
        General
      </li>
      <template v-if="showGeneral">
        <li>
          <router-link :to="{ path: '/dashboard', activeClass: 'active' }" active-class="active">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ path: '/inventory', activeClass: 'active' }" active-class="active">Inventory</router-link>
        </li>
        <li v-can-read-sales>
          <router-link :to="{ path: '/sales', activeClass: 'active' }" active-class="active">Sales</router-link>
        </li>
        <li v-is-dev>
          <router-link :to="{ path: '/reports', activeClass: 'active' }" active-class="active">Reports</router-link>
        </li>
      </template>
    </ul>
    <ul class="nav luna-nav">
      <li class="nav-category" @click="showAccount = !showAccount">
        Account
      </li>
      <template v-if="showAccount">
        <li v-is-dev>
          <router-link :to="{ path: '/profile', activeClass: 'active'}" active-class="active">Profile</router-link>
        </li>
        <li>
          <router-link :to="{ path: '/logout', activeClass: 'active'}" active-class="active">Logout</router-link>
        </li>
      </template>
    </ul>
    <ul class="nav luna-nav" v-can-any="{ term: 'or', guards: ['canReadProducts', 'canReadCategories', 'canReadWarehouses', 'canReadLocations', 'canReadVendors', 'canReadUsers'] }">
      <li class="nav-category" @click="showAdmin = !showAdmin">
        Admin
      </li>
      <template v-if="showAdmin">
        <li v-can-read-products>
          <router-link :to="{ path: '/products', activeClass: 'active'}" active-class="active">Products</router-link>
        </li>
        <li v-can-read-images>
          <router-link :to="{ path: '/images', activeClass: 'active'}" active-class="active">Images</router-link>
        </li>
        <li v-can-read-categories v-is-dev>
          <router-link :to="{ path: '/categories', activeClass: 'active'}" active-class="active">Categories</router-link>
        </li>
        <li v-can-read-warehouses>
          <router-link :to="{ path: '/warehouses', activeClass: 'active'}" active-class="active">Warehouses</router-link>
        </li>
        <li v-can-read-locations>
          <router-link :to="{ path: '/locations', activeClass: 'active'}" active-class="active">Locations</router-link>
        </li>
        <li v-can-read-vendors>
          <router-link :to="{ path: '/vendors', activeClass: 'active'}" active-class="active">Vendors</router-link>
        </li>
        <li v-can-manage-users>
          <a :href="userManagementDashboard" target="_blank">Users</a>
        </li>
      </template>
    </ul>
    <ul class="nav luna-nav">
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
import config from 'root/config';

export default {
  name: 'sidebar',
  data() {
    return {
      userManagementDashboard: config.auth0.userManagementDashboard,
      showAccount: true,
      showAdmin: true,
      showGeneral: true,
    };
  },
};

</script>
