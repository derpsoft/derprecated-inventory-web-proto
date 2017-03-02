<template>
<div>
  <div class="row control-row">
    <div class="col-md-12">
      <button type="button" class="btn btn-danger" @click="deleteConfirm" v-can-delete-images>Delete</button>
      <button class="btn btn-primary pull-right" @click="save">Save Image</button>
      <h4>Image Details</h4>
    </div>
  </div>
  <div class="panel panel-filled panel-main">
    <div class="panel-body">
      <div class="col-md-3">
        <img :src="image.url | toSsl" class="img-responsive center-block img-rounded" />
      </div>
      <div class="col-md-9">
        <image-form ref="imageForm" :image="image"></image-form>
      </div>
    </div>
  </div>
</div>

</template>

<script>
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
    toSsl(src) {
      return src.replace('http:', 'https:');
    },
  },

  mounted() {
    this.load();
  },

  methods: {
    load() {
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
      this.$store.dispatch(Constants.DELETE_IMAGE, {
        id: this.id,
        rowVersion: this.image.rowVersion,
        redirect: this.redirect,
      });
    },
  },
};

</script>
