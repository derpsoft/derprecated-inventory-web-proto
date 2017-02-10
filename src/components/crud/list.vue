<style lang="css" scoped>
table.list {
  tr.editable {
    cursor: pointer;
  }
}
</style>

<template>
<div>
  <div class="list-view">
    <div class="table-responsive">
      <table class="table table-striped table-hover list">
        <thead>
          <tr>
            <slot name="header-row">
              <th v-for="column in cols">{{column | formatColumnName}}</th>
            </slot>
          </tr>
        </thead>
        <tbody>
          <slot name="body-row" v-for="record in records" :record="record">
            <tr class="editable" @click.prevent="edit(record.id)">
              <td v-for="column in cols">{{record[column]}}</td>
            </tr>
          </slot>
        </tbody>
      </table>
    </div>
  </div>
</div>

</template>

<script>
import _ from 'lodash';

export default {
  computed: {
    cols() {
      return this.columns || _.chain(this.records[0])
        .keys()
        .value();
    },
  },

  filters: {
    formatColumnName(x) {
      return _.startCase(x);
    },
  },

  props: {
    columns: {
      type: Array,
      required: false,
    },

    records: {
      type: Array,
      required: true,
    },

    editPath: {
      type: String,
      required: false,
      default () {
        return `${this.$route.path}/edit`;
      },
    },
  },

  methods: {
    edit(id) {
      this.$router.push(`${this.editPath}/${id}`);
    },
  },
};

</script>
