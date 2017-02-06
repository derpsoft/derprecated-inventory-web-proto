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
      <location-form ref="locationForm" :location="location" @change="setLocation"></location-form>
    </div>
  </div>
</div>
</template>

<script>
import Constants from 'src/constants';
import LocationForm from './form';

export default {
  components: { LocationForm },

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

  mounted() {
    this.$store.watch(() => this.$store.getters.location, (current) => {
      this.location = Object.assign({}, current);
    });
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
        .then((isValid) => {
          if (isValid) {
            const location = JSON.parse(JSON.stringify(this.location));
            location.id = this.id;
            this.$store.dispatch(Constants.SAVE_LOCATION, {
              location
            });
          }
        });
    },

    setLocation(v) {
      this.location = v;
    },
  },
};
</script>
