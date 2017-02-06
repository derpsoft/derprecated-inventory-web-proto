<template>
<div>
  <div class="row control-row">
    <div class="col-md-12">
      <button class="btn btn-primary pull-right" type="submit" @click="save">Save</button>
      <h4>New Location Details</h4>
    </div>
  </div>
  <div class="panel panel-filled panel-main">
    <div class="panel-body">
      <location-form ref="locationForm" @change="setLocation"></location-form>
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
    return {
      location: {},
    };
  },
  methods: {
    save() {
      this.validate()
        .then((isValid) => {
          if (isValid) {
            const location = JSON.parse(JSON.stringify(this.location));
            this.$store.dispatch(Constants.CREATE_LOCATION, {
              location
            });
          }
        });
    },
    validate() {
      return this.$refs.locationForm.validate();
    },
    setLocation(v) {
      this.location = v;
    },
  }
};
</script>
