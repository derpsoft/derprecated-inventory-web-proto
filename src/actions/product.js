import log from 'loglevel';
import Constants from '../constants';
import ProductApi from '../services/productApi';
import crud from './crud';

function deleteProductImage({
  dispatch
}, {
  productId,
  id
}) {
  new ProductApi()
    .deleteImage(productId, id)
    .then(() => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'info',
        message: 'Image deleted',
      });
    })
    .catch(e => log.error(e));
}

const BASE = crud('product', ProductApi);

const INITIAL_STATE = {
  products: {
    ...BASE.INITIAL_STATE
  }
};

const ACTIONS = {
  ...BASE.ACTIONS,

  [Constants.DELETE_PRODUCT_IMAGE]: deleteProductImage,
};

const MUTATIONS = {
  ...BASE.MUTATORS,
};

const GETTERS = {
  ...BASE.GETTERS,

  productImages: state => id => state.products.all[id].images,
};

const ProductActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default ProductActions;
