<template>
  <aside class="navigation">
    <nav>
      <ul class="nav luna-nav">
        <li class="nav-category">
          General
        </li>
        <li v-link="{ path: '/', activeClass: 'active', exact: true}">
          <a href="#">Dashboard</a>
        </li>
        <li v-link="{ path: '/users', activeClass: 'active'}">
          <a href="#" >Users</a>
        </li>
        <li class="nav-category">
          Inventory
        </li>
        <li v-link="{ path: '/products', activeClass: 'active'}">
          <a href="#">Products</a>
        </li>
        <li v-link="{ path: '/warehouses', activeClass: 'active'}">
          <a href="#">Warehouses</a>
        </li>
        <li v-link="{ path: '/reports', activeClass: 'active'}">
          <a href="#" >Reports</a>
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
