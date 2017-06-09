<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            Image Details
            <div class="card-actions">
              <router-link class="btn btn-w-md btn-accent btn-return" :to="{path: '/images'}">Back to Images</router-link>
              <button class="btn btn-danger" @click="deleteConfirm" v-can-delete-images>Delete</button>
              <button class="btn btn-primary pull-right" @click="save">Save Image</button>
            </div>
          </div>
          <div class="card-block">
            <div class="row">

              <div class="col-md-3">
                <img :src="image.url | toSsl" class="img-responsive center-block img-rounded" />
              </div>
              <div class="col-md-9">
                <image-form ref="imageForm" :image="image"></image-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @flow
import Constants from 'src/constants';
import ImageForm from './form';

export default {
  name: 'imageEdit',

  components: {
    ImageForm,
  },

  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    },
    image() {
      return this.$store.getters.image(this.id) || {
        url: 'http://placehold.it/50x50',
      };
    },
  },

  watch: {
    id: 'load'
  },

  filters: {
    toSsl(src: string) {
      return src.replace('http:', 'https:');
    },
  },

  mounted() {
    this.load();
  },

  methods: {
    load() {
      // $FlowFixMe
      this.$store.dispatch(Constants.GET_IMAGE, {
        id: this.id,
      });
    },
    validate() {
      return this.$refs.imageForm.validate();
    },
    save() {
      this.validate()
        .then(({
          isValid,
          image
        }) => {
          if (isValid) {
            image.id = this.id;
            // $FlowFixMe
            this.$store.dispatch(Constants.UPDATE_IMAGE, {
              image
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
      this.$store.dispatch(Constants.DELETE_IMAGE, {
        id: this.id,
        rowVersion: this.image.rowVersion,
        redirect: () => this.$router.replace('/images'),
      });
    },
  },
};
</script>
