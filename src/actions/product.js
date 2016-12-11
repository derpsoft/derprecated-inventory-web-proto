import log from 'loglevel';
import Constants from '../constants';
import ProductApi from '../services/productApi';

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
    log.error(e);
  });
}

function createProduct({
  dispatch,
  commit
}, {
  product
}) {
  new ProductApi()
    .create(product)
    .then(res => {
      commit(Constants.SET_PRODUCT, res.product);
    })
    .catch(e => {
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
  .then(products => {
    commit(Constants.SET_PRODUCT_LIST, products);
  })
  .catch(e => {
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
  .then(products => {
    commit(Constants.SET_PRODUCT_LIST, products.results);
  })
  .catch(e => {
    log.error(e);
  });
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
  [Constants.UPDATE_PRODUCT_FIELD]: updateProductField,
  [Constants.CLEAR_PRODUCT]: clearProduct,
  [Constants.CREATE_PRODUCT]: createProduct,
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
};

const ProductActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default ProductActions;
