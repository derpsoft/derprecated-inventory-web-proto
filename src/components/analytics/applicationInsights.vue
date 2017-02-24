<template>
<div v-once>
</div>
</template>

<script>
import appInsights from 'applicationinsights';

export default {
  data() {
    const data = {};
    if (process.env.NODE_ENV !== 'testing') {
      console.log('APP INSIGHTS');
      // key is read from env APPINSIGHTS_INSTRUMENTATIONKEY
      data.appInsights = appInsights.setup();
    }
    return {};
  },

  created() {
    if (this.appInsights) {
      this.appInsights.start();
    }
  },
};
</script>
