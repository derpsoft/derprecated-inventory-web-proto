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
  dispatch,
  commit,
}, args) {
  const productApi = new ProductApi();

  return Promise.all(
      _.map(args.products, (single) => {
        return productApi
          .create(single)
          .then(x => commit(Constants.SET_PRODUCT, x))
          .catch(() => {
            console.log('Failed ->');
            console.log(single);
            dispatch(Constants.SHOW_TOASTR, {
              type: 'error',
              message: 'Import Failed.',
            });
          });
      }));
}

const BASE = crud('product', ProductApi);

const INITIAL_STATE = {
  products: {
    ...BASE.INITIAL_STATE,
  }
};

const ACTIONS = {
  ...BASE.ACTIONS,

  [Constants.DELETE_PRODUCT_IMAGE]: deleteProductImage,
  [Constants.IMPORT_PRODUCTS]: importProducts,
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
