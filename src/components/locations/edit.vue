<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Add Locations
            <div class="card-actions">
              <router-link class="btn btn-secondary btn-return" :to="{path: '/locations'}">Back to Locations</router-link>
              <button type="button" class="btn btn-danger" @click="deleteConfirm" v-can-delete-locations>Delete</button>
              <button class="btn btn-primary pull-right" type="submit" @click="save">Save</button>
            </div>
          </div>
          <div class="card-block">
            <location-form ref="locationForm" :location="location"></location-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @flow
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
      // $FlowFixMe
      this.$store.dispatch(Constants.GET_LOCATION, {
        id: this.id,
      });
    },

    validate() {
      return this.$refs.locationForm.validate();
    },

    remove() {
      // $FlowFixMe
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
            // $FlowFixMe
            this.$store.dispatch(Constants.UPDATE_LOCATION, {
              location
            });
          }
        });
    },
    deleteConfirm() {
      /* eslint-disable no-alert */
      if (window.confirm('Are you sure you want to delete?')) {
        this.delete();
      }
      /* eslint-enable no-alert */
    },

    delete() {
      // $FlowFixMe
      this.$store.dispatch(Constants.DELETE_LOCATION, {
        id: this.id,
        rowVersion: this.location.rowVersion,
        redirect: this.redirect,
      });
    },
  },
};
</script>
