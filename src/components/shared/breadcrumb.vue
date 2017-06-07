<template>
  <ol class="breadcrumb">
    <template v-for="(item, index) in list">
      <li class="breadcrumb-item" v-if="isLast(index) && item.meta.parent">
        <router-link :to="item.meta.parent.path">{{ item.meta.parent.name }}</router-link>
      </li>

      <li class="breadcrumb-item">
        <span class="active" v-if="isLast(index)">{{ showName(item) }}</span>
        <router-link :to="{ path: '/' }" v-else-if="!item.path">Home</router-link>
        <router-link :to="item.path" v-else>{{ item.name }}</router-link>
      </li>

    </template>
  </ol>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    },
    separator: String
  },
  mounted() {
      /* eslint-disable */
    console.log(this.list);
  },
  methods: {
    isLast (index) {
      return index === this.list.length - 1;
    },
    showName (item) {
      if (item.meta && item.meta.label) {
        item = item.meta && item.meta.label;
      }
      if (item.name) {
        item = item.name;
      }
      return item;
    }
  }
};
</script>
