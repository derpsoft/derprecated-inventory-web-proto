import _ from 'lodash';
import log from 'loglevel';
import Constants from 'src/constants';
import ProductApi from 'services/productApi';
import crud from 'actions/crud';

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


function importProducts({
  commit,
}, args) {
  const productApi = new ProductApi();

  return Promise.all(
      _.map(args.products, (single) => {
        return productApi
          .create(single)
          .then(x => commit(Constants.SET_PRODUCT, x))
          .catch((error) => {
            commit(Constants.SET_PRODUCT_ERROR, error);
          });
      }));
}

const BASE = crud('product', ProductApi);

const INITIAL_STATE = {
  products: {
    ...BASE.INITIAL_STATE,
    importErrors: []
  }
};

const ACTIONS = {
  ...BASE.ACTIONS,

  [Constants.DELETE_PRODUCT_IMAGE]: deleteProductImage,
  [Constants.IMPORT_PRODUCTS]: importProducts,
};

const MUTATIONS = {
  ...BASE.MUTATORS,
  [Constants.SET_PRODUCT_ERROR]: (state, error) => {
    state.products.importErrors.push(error);
  },
};

const GETTERS = {
  ...BASE.GETTERS,

  productImages: state => id => state.products.all[id].images,
  importProductErrors(state) {
    return state.products.importErrors;
  }
};

const ProductActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default ProductActions;
