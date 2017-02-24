<template>
<div>
  <div class="col-md-12" v-if="!images.length">
    There were no images found. Please add images or update the filters.
  </div>
  <crud-list :records="images" :columns="['id', 'url']">
    <template slot="body-row" scope="props">
      <tr class="editable" v-on:click="edit(props.record.id)">
        <td class="id">{{props.record.id}}</td>
        <td>
          <img :src="props.record.url | toSsl" width="50" height="50">
        </td>
      </tr>
    </template>
  </crud-list>
</div>
</template>

<script>
import CrudList from 'components/crud/list';

export default {
  name: 'imageList',

  components: {
    CrudList
  },

  filters: {
    toSsl(src) {
      return src.replace('http:', 'https:');
    },
  },

  computed: {
    images() {
      const results = this.$store.getters.imageSearch;
      if (results.length) {
        return results;
      }
      return this.$store.getters.images;
    },
  },

  methods: {
    edit(id) {
      this.$router.push(`/images/edit/${id}`);
    }
  },
};
</script>
