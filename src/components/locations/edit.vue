<template>
<div>
  <form id="location-edit-form" @submit.prevent="validate">
    <div class="row control-row">
      <div class="col-md-12">
        <button class="btn btn-primary pull-right" type="submit">Save</button>
        <h4>Location Details</h4>
      </div>
    </div>
    <div class="panel panel-filled panel-main">
      <div class="panel-body">
        <div class="media">
          <div class="form-group" :class="{'has-error': errors.has('locationName')}">
            <label>Name</label>
            <input type="text" name="locationName" class="form-control" placeholder="Name" v-model="location.name" v-validate.initial="location.name" data-vv-rules="required">
            <span v-show="errors.has('locationName')" class="help-block">Location Name is required.</span>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>
</template>

<script>
import Constants from '../../constants';
import store from '../../stores/store';

export default {
  data() {
    return {
      location: {},
    };
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    }
  },
  watch: {
    $route: 'load'
  },
  methods: {
    load() {
      store.dispatch(Constants.GET_LOCATION, {
        id: this.id,
      });
    },
    validate() {
      this.$validator.validateAll().then((success) => {
        if (!success) {
          return;
        }
        this.save();
      });
    },
    save() {
      const location = JSON.parse(JSON.stringify(this.location));
      location.id = this.id;
      store.dispatch(Constants.SAVE_LOCATION, {
        location
      });
    }
  },
  created() {
    store.watch(() => store.getters.location, (current) => {
      this.location = Object.assign({}, current);
    });
    this.load();
  }
};
</script>
