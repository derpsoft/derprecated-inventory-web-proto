<style lang="css" scoped>
.dz-image {
    img {
        margin: 0 auto;
    }
}
textarea.form-control {
    resize: none;
    height: 152px;
}
</style>

<template>
  <div>
    <div class="card">
      <div class="card-header">
        Edit Products
        <div class="card-actions">
          <button type="button" class="btn btn-danger" @click="deleteConfirm" v-can-delete-products>Delete Product</button>
          <button type="button" class="btn btn-warning" @click="showImages = !showImages">{{ !showImages ? 'Show Upload' : 'Hide Upload'}}</button>
          <button type="submit" class="btn btn-primary" @click="save" v-can-upsert-products>Save Product</button>
          <router-link class="btn btn-secondary btn-return" :to="{path: '/products'}">Back to Products</router-link>
        </div>
      </div>

      <div class="card-block">
        <!--<image-gallery ref="imageGallery" :upload-url="uploadUrl" :on-sending="xhrIntercept" :on-delete="deleteImage" :toggle="showImages" :image="images"></image-gallery>-->
        <product-form ref="productForm" :id="id"></product-form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Product as ProductApi
} from 'derp-api';
import Constants from 'src/constants';
import ImageGallery from 'components/images/gallery';
import ProductForm from './form';

export default {
  name: 'productEdit',

  components: {
    ProductForm,
    ImageGallery,
  },

  data() {
    return {
      showImages: false,
    };
  },

  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    },
    product() {
      return this.$store.getters.product(this.id);
    },
    images() {
      return this.$store.getters.productImages(this.id);
    },
    uploadUrl() {
      return new ProductApi()
        .getImageUploadUrl(this.id);
    },
  },

  watch: {
    id: 'reload',
  },

  mounted() {
    this.reload();
  },

  methods: {
    reload() {
      if (this.id) {
        this.$store.dispatch(Constants.GET_PRODUCT, {
          id: this.id
        });
      }
    },

    xhrIntercept(file: Object, xhr: Object) {
      return new ProductApi()
        .imageUploadIntercept(file, xhr);
    },

    save() {
      this.$refs.productForm
        .validate()
        .then(({
          isValid,
          product
        }) => {
          if (isValid) {
            product.id = this.id;
            this.$store.dispatch(Constants.UPDATE_PRODUCT, {
              product
            });
          }
        });
    },

    redirect() {
      this.$router.replace('/products');
    },

    deleteConfirm() {
      /* eslint-disable no-alert */
      if (window.confirm('Are you sure you want to delete?')) {
        this.deleteProduct();
      }
      /* eslint-enable no-alert */
    },

    deleteProduct() {
      this.$store.dispatch(Constants.DELETE_PRODUCT, {
        id: this.id,
        redirect: this.redirect,
      });
    },

    deleteImage(image: Object) {
      /* eslint-disable no-alert */
      if (window.confirm('Are you sure you want to delete?')) {
        this.$store.dispatch(Constants.DELETE_PRODUCT_IMAGE, {
          id: image.id,
          productId: this.id
        });
      }
      /* eslint-enable no-alert */
    },
  },
};
</script>
