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
      <image-form ref="imageForm" :image="image"></image-form>
    </div>
  </div>
</div>

</template>

<script>
import Constants from 'src/constants';
import ImageForm from './form';

export default {
  components: {
    ImageForm
  },
  data() {
    return {
      image: {},
    };
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    }
  },
  watch: {
    id: 'load'
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
  mounted() {
    this.$store.watch(
      () => this.$store.getters.image(this.id),
      (current) => {
        this.image = Object.assign({}, this.image, current);
      }
    );
    this.load();
  }
};

</script>
