<template>
  <section class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="view-header">
          <div class="pull-right">
              <button class="btn btn-w-md btn-accent btn-return" v-link="{path: '/products'}">Back to Products</button>
          </div>
          <div class="header-icon">
            <i class="pe page-header-icon pe-7s-plus"></i>
          </div>
          <div class="header-title">
            <h3>Add Product</h3>
            <small>Create a new product</small>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-filled">
          <div class="panel-body">
            <form>
              <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                      <label>Product Title</label>
                      <input type="text" class="form-control" placeholder="Enter a title...">
                    </div>
                    <div class="form-group">
                      <label>Product Description</label>
                      <input type="text" class="form-control" placeholder="Enter a description...">
                    </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <h5>
                  Product Details
                </h5>
                </div>
                <div class="col-md-12">
                  <div class="tabs-container">
                    <ul class="nav nav-tabs">
                        <li class="active"><a data-toggle="tab" href="#tab-1" aria-expanded="true">Variants</a></li>
                        <li class=""><a data-toggle="tab" href="#tab-2" aria-expanded="false">Warehouses</a></li>
                    </ul>
                    <div class="tab-content">
                        <div id="tab-1" class="tab-pane active">
                            <div class="panel-body">
                                <i class="pe pe-7s-plus"></i>
                                <strong class="c-white">Variants</strong>
                                <p>A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.</p>
                                <p>I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist
                                    than now. When.</p>
                            </div>
                        </div>
                        <div id="tab-2" class="tab-pane">
                            <div class="panel-body">
                                <strong class="c-white">Warehouses</strong>
                                <p>Thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us
                                    in his own image, and the breath </p>
                                <p>I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should
                                    be incapable of drawing a single stroke at the present moment; and yet.</p>
                            </div>
                        </div>
                    </div>
                  <!-- <div class="panel panel-filled panel-c-info">
                    <div class="panel-heading">
                      Variants
                    </div>
                  </div> -->
                </div>
              </div>
            </form>
          </div>
      </div>
    </div>
  </div>
</section>
 </template>
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

<style scope>
  .btn-return {
    margin-right: -15px;
  }
</style>
