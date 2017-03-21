<style lang="css" scoped>
.luna-nav {
  &.nav {
    padding-top: 0;

    &:first {
      padding-top: 15px;
    }

    .nav-category {
      cursor: pointer;
    }
  }
}
</style>

<template>
<aside class="navigation">
  <nav>
    <ul class="nav luna-nav" v-can-manage-sales>
      <li class="nav-category" :class="{dropup: showSales}" @click="showSales = !showSales">
        <big>Sales <span class="caret text-muted"></span></big>
      </li>
      <template v-if="showSales">
        <li>
          <router-link :to="{ path: '/sales/dashboard', activeClass: 'active' }" active-class="active">Dashboard</router-link>
        </li>
        <li v-is-dev>
          <router-link :to="{ path: '/reports', activeClass: 'active' }" active-class="active">Reports</router-link>
        </li>
        <li>
          <router-link :to="{ path: '/orders', activeClass: 'active' }" active-class="active">Orders</router-link>
        </li>
        <li v-can-read-products>
          <router-link :to="{ path: '/products', activeClass: 'active'}" active-class="active">Products</router-link>
        </li>
        <li v-can-read-images>
          <router-link :to="{ path: '/images', activeClass: 'active'}" active-class="active">Images</router-link>
        </li>
        <li v-can-read-categories v-is-dev>
          <router-link :to="{ path: '/categories', activeClass: 'active'}" active-class="active">Categories</router-link>
        </li>
        <li v-can-read-vendors>
          <router-link :to="{ path: '/vendors', activeClass: 'active'}" active-class="active">Vendors</router-link>
        </li>
      </template>
    </ul>

    <ul class="nav luna-nav" v-can-manage-inventory>
      <li class="nav-category" :class="{dropup: showInventory}" @click="showInventory = !showInventory">
        <big>Logistics <span class="caret text-muted"></span></big>
      </li>
      <template v-if="showInventory">
        <li>
          <router-link :to="{ path: '/inventory/dashboard', activeClass: 'active' }" active-class="active">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ path: '/inventory', activeClass: 'active'}" active-class="active" exact>Inventory</router-link>
        </li>
        <li v-is-dev>
          <router-link :to="{ path: '/reports', activeClass: 'active' }" active-class="active">Reports</router-link>
        </li>
        <li v-can-read-warehouses>
          <router-link :to="{ path: '/warehouses', activeClass: 'active'}" active-class="active">Warehouses</router-link>
        </li>
        <li v-can-read-locations>
          <router-link :to="{ path: '/locations', activeClass: 'active'}" active-class="active">Locations</router-link>
        </li>
      </template>
    </ul>

    <ul class="nav luna-nav">
      <li class="nav-category" :class="{dropup: showAccount}" @click="showAccount = !showAccount">
        <big>Account <span class="caret text-muted"></span></big>
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
      <li class="nav-category" :class="{dropup: showAdmin}" @click="showAdmin = !showAdmin">
        <big>Admin <span class="caret text-muted"></span></big>
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
      showSales: true,
      showInventory: true,
    };
  },
};

</script>
