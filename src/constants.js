export default {
  API_ROOT: 'https://inventory-api-dev.azurewebsites.net',

  SET_PROFILE: 'SET_PROFILE',
  GET_PROFILE: 'GET_PROFILE',
  CLEAR_PROFILE: 'CLEAR_PROFILE',

  SET_SESSION: 'SET_SESSION',
  GET_SESSION: 'GET_SESSION',
  CLEAR_SESSION: 'CLEAR_SESSION',

  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGOUT: 'LOGOUT',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',

  REGISTER: 'REGISTER',
  REGISTATION_FAILED: 'REGISTRATION_FAILED',

  GET_PRODUCT: 'GET_PRODUCT',
  SET_PRODUCT: 'SET_PRODUCT',
  CLEAR_PRODUCT: 'CLEAR_PRODUCT',
  CREATE_PRODUCT: 'CREATE_PRODUCT',
  SAVE_PRODUCT: 'SAVE_PRODUCT',

  GET_PRODUCTS: 'GET_PRODUCTS',
  SEARCH_PRODUCTS: 'SEARCH_PRODUCTS',
  UPDATE_PRODUCT_FIELD: 'UPDATE_PRODUCT_FIELD',
  SET_PRODUCT_SEARCH_QUERY: 'SET_PRODUCT_SEARCH_QUERY',
  SET_PRODUCT_SEARCH_RESULTS: 'SET_PRODUCT_SEARCH_RESULTS',
  CLEAR_PRODUCT_SEARCH: 'CLEAR_PRODUCT_SEARCH',
  SET_PRODUCT_LIST: 'SET_PRODUCT_LIST',
  SEARCH_PRODUCTS_WITH_TYPEAHEAD: 'SEARCH_PRODUCTS_WITH_TYPEAHEAD',

  SAVE_USER: 'SAVE_USER',
  SET_USER: 'SET_USER',
  GET_USER: 'GET_USER',
  CLEAR_USER: 'CLEAR_USER',
  CREATE_USER: 'CREATE_USER',
  GET_USERS: 'GET_USERS',
  SET_USERS: 'SET_USERS',
  SET_USERS_SEARCH_QUERY: 'SET_USERS_SEARCH_QUERY',
  SET_USERS_SEARCH_RESULTS: 'SET_USERS_SEARCH_RESULTS',
  CLEAR_USERS_SEARCH: 'CLEAR_USERS_SEARCH',
  SEARCH_USERS_WITH_TYPEAHEAD: 'SEARCH_USERS_WITH_TYPEAHEAD',

  GET_VENDOR: 'GET_VENDOR',
  GET_VENDORS: 'GET_VENDORS',
  SET_VENDOR: 'SET_VENDOR',
  CREATE_VENDOR: 'CREATE_VENDOR',
  SAVE_VENDOR: 'SAVE_VENDOR',
  CLEAR_VENDOR: 'CLEAR_VENDOR',
  SEARCH_VENDORS: 'SEARCH_VENDORS',
  SET_VENDOR_SEARCH_QUERY: 'SET_VENDOR_SEARCH_QUERY',
  SET_VENDOR_SEARCH_RESULTS: 'SET_VENDOR_SEARCH_RESULTS',
  CLEAR_VENDOR_SEARCH: 'CLEAR_VENDOR_SEARCH',
  SET_VENDOR_LIST: 'SET_VENDOR_LIST',
  SET_VENDOR_COUNT: 'SET_VENDOR_COUNT',
  COUNT_VENDORS: 'COUNT_VENDORS',
  SEARCH_VENDORS_WITH_TYPEAHEAD: 'SEARCH_VENDORS_WITH_TYPEAHEAD',

  GET_WAREHOUSE: 'GET_WAREHOUSE',
  GET_WAREHOUSES: 'GET_WAREHOUSES',
  SET_WAREHOUSE: 'SET_WAREHOUSE',
  CREATE_WAREHOUSE: 'CREATE_WAREHOUSE',
  SAVE_WAREHOUSE: 'SAVE_WAREHOUSE',
  CLEAR_WAREHOUSE: 'CLEAR_WAREHOUSE',
  SEARCH_WAREHOUSES: 'SEARCH_WAREHOUSES',
  SEARCH_WAREHOUSES_WITH_TYPEAHEAD: 'SEARCH_WAREHOUSES_WITH_TYPEAHEAD',
  SET_WAREHOUSE_SEARCH_QUERY: 'SET_WAREHOUSE_SEARCH_QUERY',
  SET_WAREHOUSE_SEARCH_RESULTS: 'SET_WAREHOUSE_SEARCH_RESULTS',
  CLEAR_WAREHOUSE_SEARCH: 'CLEAR_WAREHOUSE_SEARCH',
  SET_WAREHOUSE_LIST: 'SET_WAREHOUSE_LIST',
  COUNT_WAREHOUSES: 'COUNT_WAREHOUSES',
  SET_WAREHOUSE_COUNT: 'SET_WAREHOUSE_COUNT',

  SET_USER_PERMISSIONS: 'SET_PERMISSIONS',
  SET_USER_PERMISSION: 'SET_PERMISSION',
  UNSET_USER_PERMISSIONS: 'UNSET_PERMISSIONS',
  UNSET_USER_PERMISSION: 'UNSET_PERMISSION',
  GET_PERMISSIONS: 'GET_PERMISSIONS',

  SET_QUANTITY_ON_HAND: 'SET_QUANTITY_ON_HAND',
  GET_QUANTITY_ON_HAND: 'GET_QUANTITY_ON_HAND',
  RECEIVE_INVENTORY: 'RECEIVE_INVENTORY',
  LOCATE_INVENTORY: 'LOCATE_INVENTORY',
  DISPATCH_INVENTORY: 'DISPATCH_INVENTORY',
  GET_INVENTORY_TRANSACTION_LOGS: 'GET_INVENTORY_TRANSACTION_LOGS',
  SET_INVENTORY_TRANSACTION_LOGS: 'SET_INVENTORY_TRANSACTION_LOGS',
  SEARCH_INVENTORY_TRANSACTION_LOGS: 'SEARCH_INVENTORY_TRANSACTION_LOGS',
  COUNT_INVENTORY_LOGS: 'COUNT_INVENTORY_LOGS',
  SET_INVENTORY_TRANSACTION_LOG_COUNT: 'SET_INVENTORY_TRANSACTION_LOG_COUNT',

  GET_SALES_BY_TOTAL: 'GET_SALES_BY_TOTAL',
  SET_SALES_BY_TOTAL: 'SET_SALES_BY_TOTAL',

  permissions: {
    EVERYTHING: 'everything',

    MANAGE_INVENTORY: 'manageInventory',
    MANAGE_LOCATIONS: 'manageLocations',
    MANAGE_PRODUCTS: 'manageProducts',
    MANAGE_USERS: 'manageUsers',
    MANAGE_VENDORS: 'manageVendors',
    MANAGE_WAREHOUSES: 'manageWarehouses',

    READ_LOCATIONS: 'readLocations',
    READ_PRODUCTS: 'readProducts',
    READ_REPORTS: 'readReports',
    READ_USERS: 'readUsers',
    READ_VENDORS: 'readVendors',
    READ_WAREHOUSES: 'readWarehouses',

    UPSERT_LOCATIONS: 'upsertLocations',
    UPSERT_PRODUCTS: 'upsertProducts',
    UPSERT_USERS: 'upsertUsers',
    UPSERT_VENDORS: 'upsertVendors',
    UPSERT_WAREHOUSES: 'upsertWarehouses',

    DELETE_LOCATIONS: 'deleteLocations',
    DELETE_PRODUCTS: 'deleteProducts',
    DELETE_USERS: 'deleteUsers',
    DELETE_VENDORS: 'deleteVendors',
    DELETE_WAREHOUSES: 'deleteWarehouses',

    RECEIVE_INVENTORY: 'receiveInventory',
    RELEASE_INVENTORY: 'releaseInventory',
  }
};
