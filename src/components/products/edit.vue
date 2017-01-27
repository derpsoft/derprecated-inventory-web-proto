<style lang="less" scoped>
.dz-image {
    img {
        margin: 0 auto;
    }
}
.product-title {
    margin-bottom: 25px;
}
.product-controls {
    margin-top: -8px;
    button {
        margin-left: 10px;
    }
}
.panel-main {
    padding-top: 15px;
}
textarea.form-control {
    resize: none;
    height: 152px;
}
</style>

<template>
<div>
  <div class="row">
    <div class="col-md-12">
      <div>

        <div class="product-title">
          <div class="pull-right product-controls">
            <button type="button" class="btn btn-danger" @click="deleteProductConfirm" v-can-delete-products>Delete Product</button>
            <button type="button" class="btn btn-warning" @click="showImages = !showImages">{{ !showImages ? 'Show Images' : 'Hide Images'}}</button>
            <button type="submit" class="btn btn-primary" @click="save" v-can-upsert-products>Save Product</button>
          </div>
          <h4>{{ product.title }}</h4>
        </div>

        <div class="row" v-show="showImages">
          <div class="col-lg-12">
            <image-gallery ref="imageGallery" :images="images" :upload-url="uploadUrl" :on-sending="xhrIntercept" :on-delete="deleteImage"></image-gallery>
          </div>
        </div>

        <product-form ref="productForm" :id="id"></product-form>

      </div>
    </div>
  </div>
</div>
</template>

<script>
import Constants from '../../constants';
import ProductForm from './form.vue';
import ImageGallery from '../images/gallery.vue';
import ProductApi from '../../services/productApi';

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
      return new ProductApi().getImageUploadUrl(this.id);
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

    xhrIntercept(file, xhr) {
      return new ProductApi().imageUploadIntercept(file, xhr);
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
            this.$store.dispatch(Constants.SAVE_PRODUCT, {
              product
            });
          }
        });
    },

    deleteProductConfirm() {
      /* eslint-disable no-alert */
      if (window.confirm('Are you sure you want to delete?')) {
        this.deleteProduct();
      }
      /* eslint-enable no-alert */
    },

    deleteProduct() {
      this.$store.dispatch(Constants.DELETE_PRODUCT, this.id);
    },

    deleteImage(image) {
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
