<template>
<div v-once>
</div>
</template>

<script>
import appInsights from 'applicationinsights';

export default {
  data() {
    return {
      // key is read from env APPINSIGHTS_INSTRUMENTATIONKEY
      appInsights: appInsights.setup(),
    };
  },

  created() {
    this.appInsights.start();
  },
};

</script>
