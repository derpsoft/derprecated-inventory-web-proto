import Constants from '../constants';
import ProductApi from '../services/productApi';
// import _ from 'lodash';

function getProduct({
  commit
}, {
  id
}) {
  new ProductApi().retrieve(id)
  .then(product => {
    commit(Constants.SET_PRODUCT, product);
  })
  .catch(e => {
    console.error(e);
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
  .then(products => {
    commit(Constants.SET_PRODUCT_LIST, products);
  })
  .catch(e => {
    console.error(e);
  });
}

function search() {}

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
  [Constants.UPDATE_PRODUCT_FIELD]: updateProductField,
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
};

const GETTERS = {};

const ProductActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default ProductActions;
