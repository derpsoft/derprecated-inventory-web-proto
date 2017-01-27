import log from 'loglevel';
import _ from 'lodash';
import Vue from 'vue';
import Constants from '../constants';
import ProductApi from '../services/productApi';

function getProduct({
  dispatch,
  commit
}, {
  id,
  includeDeleted = false,
  toastError = true,
}) {
  new ProductApi().retrieve(id, includeDeleted)
    .then((product) => {
      commit(Constants.SET_PRODUCT, product);
    })
    .catch((e) => {
      if (toastError) {
        dispatch(Constants.SHOW_TOASTR, {
          type: 'error',
          message: 'Error Retrieving Product.'
        });
      }
      log.error(e);
    });
}

function createProduct({
  dispatch,
  commit
}, {
  product,
  redirect
}) {
  new ProductApi()
    .save(product)
    .then((p) => {
      commit(Constants.SET_PRODUCT, p);

      if (typeof redirect === 'function') {
        redirect.apply();
      }
    })
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Creating Product.'
      });
      log.error(e);
    });
}

function saveProduct({
  dispatch,
  commit
}, {
  product
}) {
  new ProductApi()
    .save(product)
    .then((p) => {
      commit(Constants.SET_PRODUCT, p);
      dispatch(Constants.SHOW_TOASTR, {
        type: 'success',
        message: 'Saved Product Successfully.'
      });
    })
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Saving Product.'
      });
      log.error(e);
    });
}

function getProducts({
  dispatch,
  commit
}, {
  skip = 0,
  take = 25
}) {
  new ProductApi().list(skip, take)
    .then((products) => {
      commit(Constants.SET_PRODUCTS, products);
    })
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Loading Products.'
      });
      log.error(e);
    });
}

function searchProductsWithTypeahead({
  dispatch,
  commit
}, {
  query
}) {
  new ProductApi().typeahead(query)
    .then(products => commit(Constants.SET_PRODUCT_SEARCH_RESULTS, products))
    .catch(e => log.error(e));
}

function updateProductField() {}

function deleteProduct({
  dispatch,
  commit,
}, id) {
  if (id < 1) {
    throw new Error('id must be >= 1');
  }
  new ProductApi()
    .delete(id)
    .then(() => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'info',
        message: 'Product deleted',
      });
      commit(Constants.CLEAR_PRODUCT, id);
    })
    .catch(e => log.error(e));
}

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

const INITIAL_STATE = {
  products: {
    search: {
      query: {},
      results: {}
    },
    all: {},
    images: {},
  }
};

const ACTIONS = {
  [Constants.GET_PRODUCT]: getProduct,
  [Constants.GET_PRODUCTS]: getProducts,
  [Constants.SEARCH_PRODUCTS_WITH_TYPEAHEAD]: searchProductsWithTypeahead,
  [Constants.UPDATE_PRODUCT_FIELD]: updateProductField,
  [Constants.CREATE_PRODUCT]: createProduct,
  [Constants.SAVE_PRODUCT]: saveProduct,
  [Constants.DELETE_PRODUCT]: deleteProduct,
  [Constants.DELETE_PRODUCT_IMAGE]: deleteProductImage,
};

const MUTATIONS = {
  [Constants.SET_PRODUCT_SEARCH_QUERY]: (state, query) => {
    state.products.search.query = query;
  },
  [Constants.SET_PRODUCT_SEARCH_RESULTS]: (state, results) => {
    state.products.search.results = results;
  },
  [Constants.CLEAR_PRODUCT_SEARCH]: (state) => {
    state.products.search = {
      query: {},
      results: {},
    };
  },
  [Constants.SET_PRODUCTS]: (state, results) => {
    state.products.all = _.merge({},
      state.products.all,
      _.keyBy(results, x => x.id)
    );
    state.products.images = _.merge({},
      state.products.images,
      _.mapValues(state.products.all, x => x.images)
    );
  },
  [Constants.SET_PRODUCT]: (state, result) => {
    if (state.products.all[result.id]) {
      state.products.all[result.id] = _.merge({}, state.products.all[result.id], result);
      state.products.images[result.id] = result.images;
    } else {
      Vue.set(state.products.all, result.id, result);
      Vue.set(state.products.images, result.id, result.images);
    }
  },
  [Constants.CLEAR_PRODUCT]: (state, id) => {
    delete state.products.all[id];
    delete state.products.images[id];
  },
};

const GETTERS = {
  products: state => _.values(state.products.all),
  product: state => id => state.products.all[id],
  productImages: state => id => state.products.images[id],
  productSearch: state => state.products.search.results,
};

const ProductActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default ProductActions;
