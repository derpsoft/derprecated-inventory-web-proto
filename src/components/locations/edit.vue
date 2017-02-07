<template>
<div>
  <div class="row control-row">
    <div class="col-md-12">
      <button class="btn btn-danger pull-right" @click="remove">Delete</button>
      <button class="btn btn-primary pull-right" type="submit" @click="save">Save</button>
      <h4>Location Details</h4>
    </div>
  </div>
  <div class="panel panel-filled panel-main">
    <div class="panel-body">
      <location-form ref="locationForm" :location="location"></location-form>
    </div>
  </div>
</div>
</template>

<script>
import Constants from 'src/constants';
import LocationForm from './form';

export default {
  components: {
    LocationForm
  },

  data() {
    return {};
  },

  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    },
    location() {
      return this.$store.getters.location(this.id);
    },
  },

  watch: {
    $route: 'load',
    id: 'load',
  },

  mounted() {
    this.load();
  },

  methods: {
    load() {
      this.$store.dispatch(Constants.GET_LOCATION, {
        id: this.id,
      });
    },

    validate() {
      return this.$refs.locationForm.validate();
    },

    remove() {
      this.$store.dispatch(Constants.DELETE_LOCATION, this.id);
    },

    save() {
      this.validate()
        .then(({
          isValid,
          location
        }) => {
          if (isValid) {
            location.id = this.id;
            this.$store.dispatch(Constants.UPDATE_LOCATION, {
              location
            });
          }
        });
    },
  },
};
</script>
