<style lang="css" scoped>
.nav-item {
  cursor: pointer;
}
</style>

<template>
<div class="sidebar">
  <nav class="sidebar-nav">
    <ul class="nav">
      <li class="nav-item">
        <router-link :to="{ path: '/dashboard'}" class="nav-link" exact><i class="icon-speedometer"></i> Dashboard</router-link>
      </li>
      <li class="nav-item nav-dropdown" v-can-manage-sales>
        <a class="nav-link nav-dropdown-toggle" @click="handleClick"><i class="icon-wallet"></i> Sales</a>
        <ul class="nav-dropdown-items">
          <li class="nav-item">
            <router-link :to="{ path: '/sales/dashboard'}" class="nav-link" exact><i class="icon-speedometer"></i> Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ path: '/reports'}" class="nav-link" exact><i class="icon-chart"></i>Reports</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ path: '/orders'}" class="nav-link" exact><i class="icon-feed"></i>Orders</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ path: '/products'}" class="nav-link" exact><i class="icon-drawer"></i>Products</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ path: '/images'}" class="nav-link" exact><i class="icon-picture"></i>Images</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ path: '/categories'}" class="nav-link" exact><i class="icon-doc"></i>Categories</router-link>
          </li>
        </ul>
      </li>
      <li class="nav-item nav-dropdown" v-can-manage-inventory>
        <a class="nav-link nav-dropdown-toggle" @click="handleClick"><i class="icon-compass"></i> Logistics</a>
        <ul class="nav-dropdown-items">
          <li class="nav-item">
            <router-link :to="{ path: '/inventory/dashboard'}" class="nav-link" exact><i class="icon-speedometer"></i>Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ path: '/inventory'}" class="nav-link" exact exact><i class="icon-notebook"></i>Inventory</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ path: '/reports'}" class="nav-link" exact><i class="icon-chart"></i>Reports</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ path: '/warehouses'}" class="nav-link" exact><i class="icon-globe"></i>Warehouses</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ path: '/locations'}" class="nav-link" exact><i class="icon-map"></i>Locations</router-link>
          </li>
        </ul>
      </li>
      <li class="nav-item nav-dropdown" v-can-any="{ term: 'or', guards: ['canReadProducts', 'canReadCategories', 'canReadWarehouses', 'canReadLocations', 'canReadVendors', 'canReadUsers'] }">
      <li class="nav-category"
        <a class="nav-link nav-dropdown-toggle" @click="handleClick"><i class="icon-settings"></i> Admin</a>
        <ul class="nav-dropdown-items">
          <li class="nav-item">
            <router-link :to="{ path: '/products'}" class="nav-link" exact><i class="icon-drawer"></i>Products</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ path: '/images'}" class="nav-link" exact><i class="icon-picture"></i>Images</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ path: '/categories'}" class="nav-link" exact><i class="icon-doc"></i>Categories</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ path: '/warehouses'}" class="nav-link" exact><i class="icon-globe"></i>Warehouses</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ path: '/locations'}" class="nav-link" exact><i class="icon-map"></i>Locations</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ path: '/vendors'}" class="nav-link" exact><i class="icon-organization"></i>Vendors</router-link>
          </li>
          <li class="nav-item">
            <a :href="userManagement" target="_blank" class="nav-link" exact><i class="icon-organization"></i>Authentication</a>
          </li>
          <li class="nav-item">
            <a :href="userManagementDashboard" target="_blank" class="nav-link" exact><i class="icon-people"></i>User Dashboard</a>
          </li>
        </ul>
      </li>
      <li class="nav-item nav-dropdown">
        <a class="nav-link nav-dropdown-toggle" @click="handleClick"><i class="icon-user"></i> Account</a>
        <ul class="nav-dropdown-items">
          <li class="nav-item">
            <router-link :to="{ path: '/logout'}" class="nav-link" exact><i class="icon-logout"></i>Logout</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</div>

</template>

<script>
  import config from 'root/config';

  export default {
    name: 'sidebar',
    data() {
      return {
        userManagementDashboard: config.auth0.userManagementDashboard,
        userManagement: config.auth0.userManagement,
        showAccount: true,
        showAdmin: true,
        showGeneral: true,
        showSales: true,
        showInventory: true,
      };
    },
    methods: {
      handleClick (e) {
        e.preventDefault();
        e.target.parentElement.classList.toggle('open');
      }
    },
  };

</script>
