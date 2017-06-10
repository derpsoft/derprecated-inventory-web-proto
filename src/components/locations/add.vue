<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Add Locations
            <div class="card-actions">
              <router-link class="btn btn-secondary btn-return" :to="{path: '/locations'}">Back to Locations</router-link>
              <button class="btn btn-primary pull-right" type="submit" @click="save">Save</button>
            </div>
          </div>
          <div class="card-block">
            <location-form ref="locationForm" @change="setLocation"></location-form>
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
    return {
      location: {},
    };
  },
  methods: {
    save() {
      this.validate()
        .then(({
          isValid,
          location
        }) => {
          if (isValid) {
            // $FlowFixMe
            this.$store.dispatch(Constants.CREATE_LOCATION, {
              location
            });
          }
        });
    },
    validate() {
      return this.$refs.locationForm.validate();
    },
    setLocation(v: Object) {
      this.location = v;
    },
  }
};
</script>
