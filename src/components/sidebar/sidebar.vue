<template>
  <aside class="navigation">
    <nav>
      <ul class="nav luna-nav">
        <li class="nav-category">
          Main
        </li>
        <li class="active">
          <a href="#" v-link="{ path: '/'}">Dashboard</a>
        </li>
        <li class="nav-category">
          Inventory
        </li>
        <li>
          <a href="#" v-link="{ path: 'products'}">Products</a>
        </li>
        <li>
          <a href="#" v-link="{ path: 'warehouses'}">Warehouses</a>
        </li>
        <li>
          <a href="#" v-link="{ path: 'reports'}">Reports</a>
        </li>
        <li class="nav-info">
            <i class="pe pe-7s-shield text-accent"></i>
            <div class="m-t-xs">
                <span class="c-white">BAUS</span> Inventory System.
            </div>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
  export default {};
</script>
