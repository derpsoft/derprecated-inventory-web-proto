<template>
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
              <button class="btn btn-w-md btn-accent" v-link="{path: '/test'}">Add New User</button>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-users"></i>
          </div>
          <div class="header-title">
            <h3>Users</h3>
            <small>Find all contacts</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="table-responsive">
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
  export default {
    // Options / Data
    data() {
      return {};
    },
    props: [],
    computed: {},
    methods: {},
    // watch: {},
    // Options / DOM
    // el () {},
    // replace: true,
    // template: '',
    // Options / Lifecycle Hooks
    // init () {},
    // crated () {},
    // beforeCompile () {},
    // compiled () {},
    // ready () {},
    // attached () {},
    // detached () {},
    // beforeDestroy () {},
    // destroyed () {},
    // Options / Assets
    // directives: {},
    // elementDirectives: {},
    // filters: {},
    // components: {},
    // transitions: {},
    // partials: {},
    // Options / Misc
    // parent: null,
    // events: {},
    // mixins: [],
    // name: ''
  };
</script>
