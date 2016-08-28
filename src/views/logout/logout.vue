<template>
  <div></div>
</template>

<script>
  import Auth from '../../services/auth.js';
  export default {
    init() {
      const auth = new Auth();
      auth.logout();
    },
  };
</script>
