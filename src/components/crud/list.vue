<style lang="css" scoped>
table.list {
  tr.editable {
    cursor: pointer;
  }
}
</style>

<template>
<div>
  <table class="table table-bordered table-striped table-condensed">
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
        <td v-for="column in cols">{{record[ typeof column === 'string' ? column : column.name ]}}</td>
      </tr>
      </slot>
    </tbody>
  </table>
  <!--<ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Prev</a></li>
    <li class="page-item active">
      <a class="page-link" href="#">1</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">4</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>-->
</div>
</template>

<script>
// @flow
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
      formatColumnName(x: Object) {
        const name = typeof x === 'string' ? x : x.displayName;
        return _.startCase(name);
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
      edit(id: number) {
        this.$router.push(`${this.editPath}/${id}`);
      },
    },
  };
</script>
