import log from 'loglevel';
import Constants from '../constants';
import ProductApi from '../services/productApi';

function getProduct({
  dispatch,
  commit
}, {
  id
}) {
  new ProductApi().retrieve(id)
    .then((product) => {
      commit(Constants.SET_PRODUCT, product);
    })
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Retrieving Product.'
      });
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
    .then((res) => {
      commit(Constants.SET_PRODUCT, res.product);

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
    .then((res) => {
      commit(Constants.SET_PRODUCT, res.product);
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
      commit(Constants.SET_PRODUCT_LIST, products);
    })
    .catch((e) => {
      dispatch(Constants.SHOW_TOASTR, {
        type: 'error',
        message: 'Error Loading Products.'
      });
      log.error(e);
    });
}

function search({
  dispatch,
  commit,
}, {
  query
}) {
  new ProductApi().search(query)
    .then((products) => {
      commit(Constants.SET_PRODUCT_LIST, products.results);
    })
    .catch((e) => {
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
    .then(response => commit(Constants.SET_PRODUCT_LIST, response.products))
    .catch(e => log.error(e));
}

function clearProduct({
  commit
}) {
  commit(Constants.CLEAR_PRODUCT);
}

function updateProductField() {}

const INITIAL_STATE = {
  products: {
    search: {
      query: {},
      results: {}
    },
    list: [],
    product: {},
  }
};

const ACTIONS = {
  [Constants.GET_PRODUCT]: getProduct,
  [Constants.GET_PRODUCTS]: getProducts,
  [Constants.SEARCH_PRODUCTS]: search,
  [Constants.SEARCH_PRODUCTS_WITH_TYPEAHEAD]: searchProductsWithTypeahead,
  [Constants.UPDATE_PRODUCT_FIELD]: updateProductField,
  [Constants.CLEAR_PRODUCT]: clearProduct,
  [Constants.CREATE_PRODUCT]: createProduct,
  [Constants.SAVE_PRODUCT]: saveProduct,
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
  [Constants.SET_PRODUCT_LIST]: (state, results) => {
    state.products.list = results;
  },
  [Constants.SET_PRODUCT]: (state, results) => {
    state.products.product = results;
  },
  [Constants.CLEAR_PRODUCT]: (state) => {
    state.products.product = {};
  },
};

const GETTERS = {
  productList(state) {
    return state.products.list;
  },
  product(state) {
    return state.products.product;
  },
  productUpdated(state) {
    return state.products.updated;
  }
};

const ProductActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default ProductActions;
