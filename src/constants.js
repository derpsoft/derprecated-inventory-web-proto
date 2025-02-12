// @flow
import _ from 'lodash';
import inflection from 'lodash-inflection';
import config from 'root/config';

_.mixin(inflection, {});

const constants = {
  API_ROOT: config.api,

  CLEAR_INVENTORY_ERRORS: 'CLEAR_INVENTORY_ERRORS',
  CLEAR_INVENTORY_SEARCH: 'CLEAR_INVENTORY_SEARCH',
  CLEAR_PROFILE: 'CLEAR_PROFILE',
  COUNT_INVENTORY_LOGS: 'COUNT_INVENTORY_LOGS',
  CREATE_INVENTORY_TRANSACTION: 'CREATE_INVENTORY_TRANSACTION',
  DELETE_PRODUCT_IMAGE: 'DELETE_PRODUCT_IMAGE',
  DISPATCH_INVENTORY: 'DISPATCH_INVENTORY',
  GET_DASHBOARD: 'GET_DASHBOARD',
  GET_INVENTORY_SHIPPED_BY_USER: 'GET_INVENTORY_SHIPPED_BY_USER',
  GET_INVENTORY_TRANSACTION_LOGS: 'GET_INVENTORY_TRANSACTION_LOGS',
  GET_PERMISSIONS: 'GET_PERMISSIONS',
  GET_PROFILE: 'GET_PROFILE',
  GET_QUANTITY_ON_HAND: 'GET_QUANTITY_ON_HAND',
  GET_DASHBOARD_SALES_BY_USER: 'GET_SALES_BY_USER',
  GET_DASHBOARD_REVENUE_BY_USER: 'GET_REVENUE_BY_USER',
  GET_DASHBOARD_LISTINGS_BY_USER: 'GET_LISTINGS_BY_USER',
  SET_DASHBOARD_SALES_BY_USER: 'SET_DASHBOARD_SALES_BY_USER',
  SET_DASHBOARD_REVENUE_BY_USER: 'SET_DASHBOARD_REVENUE_BY_USER',
  SET_DASHBOARD_LISTINGS_BY_USER: 'SET_DASHBOARD_LISTINGS_BY_USER',
  GET_DASHBOARD_INVENTORY_RECEIVED_BY_USER: 'GET_DASHBOARD_INVENTORY_RECEIVED_BY_USER',
  SET_DASHBOARD_INVENTORY_RECEIVED_BY_USER: 'SET_DASHBOARD_INVENTORY_RECEIVED_BY_USER',
  GET_DASHBOARD_INVENTORY_SHIPPED_BY_USER: 'GET_DASHBOARD_INVENTORY_SHIPPED_BY_USER',
  SET_DASHBOARD_INVENTORY_SHIPPED_BY_USER: 'SET_DASHBOARD_INVENTORY_SHIPPED_BY_USER',

  IMPORT_PRODUCTS: 'IMPORT_PRODUCTS',
  LOCATE_INVENTORY: 'LOCATE_INVENTORY',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  RECEIVE_INVENTORY_BULK: 'RECEIVE_INVENTORY_BULK',
  RECEIVE_INVENTORY: 'RECEIVE_INVENTORY',
  SEARCH_INVENTORY_TRANSACTION_LOGS: 'SEARCH_INVENTORY_TRANSACTION_LOGS',
  SET_DASHBOARD_REPORT: 'SET_DASHBOARD_REPORT',
  SET_INVENTORY_ERROR: 'SET_INVENTORY_ERROR',
  SET_INVENTORY_TRANSACTION_LOG_COUNT: 'SET_INVENTORY_TRANSACTION_LOG_COUNT',
  SET_INVENTORY_TRANSACTION_LOGS: 'SET_INVENTORY_TRANSACTION_LOGS',
  SET_PROFILE: 'SET_PROFILE',
  SET_QUANTITY_ON_HAND: 'SET_QUANTITY_ON_HAND',
  SET_SALES_BY_PRODUCT: 'SET_SALES_BY_PRODUCT',
  SET_SALES_BY_TOTAL: 'SET_SALES_BY_TOTAL',
  SET_SALES_BY_VENDOR: 'SET_SALES_BY_VENDOR',
  GET_SALES_BY_PRODUCT: 'GET_SALES_BY_PRODUCT',
  GET_SALES_BY_TOTAL: 'GET_SALES_BY_TOTAL',
  GET_SALES_BY_VENDOR: 'GET_SALES_BY_VENDOR',
  SET_SESSION: 'SET_SESSION',
  SET_TOKENS: 'SET_TOKENS',
  SET_USER_PERMISSION: 'SET_USER_PERMISSION',
  SET_USER_PERMISSIONS: 'SET_USER_PERMISSIONS',
  SHOW_TOASTR: 'SHOW_TOASTR',
  UNSET_USER_PERMISSION: 'UNSET_USER_PERMISSION',
  UNSET_USER_PERMISSIONS: 'UNSET_USER_PERMISSIONS',

  orderStatus: {
    PENDING: 'pending',
    AWAITING_PAYMENT: 'awaitingPayment',
    AWAITING_FULFILLMENT: 'awaitingFulfillment',
    AWAITING_SHIPMENT: 'awaitingShipment',
    PARTIALLY_SHIPPED: 'partiallyShipped',
    SHIPPED: 'shipped',
    CANCELLED: 'cancelled',
    DECLINED: 'declined',
    REFUNDED: 'refunded',
  },

  roles: {
    DELEGATED_ADMIN_ADMINISTRATOR: 'Delegated Admin - Administrator',
    DELEGATED_ADMIN_USER: 'Delegated Admin - User',
  },

  permissions: {
    EVERYTHING: {
      key: 'everything',
      description: 'Everything',
    },
    LOGIN: {
      key: 'login',
      description: 'Can login'
    },
    MANAGE_INVENTORY: {
      key: 'manageInventory',
      description: 'Manage Inventory',
    },
    MANAGE_LOCATIONS: {
      key: 'manageLocations',
      description: 'Manage Locations',
    },
    MANAGE_PRODUCTS: {
      key: 'manageProducts',
      description: 'Manage Products',
    },
    MANAGE_IMAGES: {
      key: 'manageImages',
      description: 'Manage Images',
    },
    MANAGE_USERS: {
      key: 'manageUsers',
      description: 'Manage Users',
    },
    MANAGE_VENDORS: {
      key: 'manageVendors',
      description: 'Manage Vendors',
    },
    MANAGE_WAREHOUSES: {
      key: 'manageWarehouses',
      description: 'Manage Warehouses',
    },
    MANAGE_CATEGORIES: {
      key: 'manageCategories',
      description: 'Manage Categories',
    },
    MANAGE_SALES: {
      key: 'manageSales',
      description: 'Manage Sales',
    },
    MANAGE_ORDERS: {
      key: 'manageOrders',
      description: 'Manage Orders',
    },

    READ_LOCATIONS: {
      key: 'readLocations',
      description: 'Read Locations',
    },
    READ_PRODUCTS: {
      key: 'readProducts',
      description: 'Read Products',
    },
    READ_IMAGES: {
      key: 'readImages',
      description: 'Read Images',
    },
    READ_REPORTS: {
      key: 'readReports',
      description: 'Read Reports',
    },
    READ_USERS: {
      key: 'readUsers',
      description: 'Read Users',
    },
    READ_VENDORS: {
      key: 'readVendors',
      description: 'Read Vendors',
    },
    READ_WAREHOUSES: {
      key: 'readWarehouses',
      description: 'Read Warehouses',
    },
    READ_CATEGORIES: {
      key: 'readCategories',
      description: 'Read Categories',
    },

    UPSERT_LOCATIONS: {
      key: 'upsertLocations',
      description: 'Upsert Locations',
    },
    UPSERT_PRODUCTS: {
      key: 'upsertProducts',
      description: 'Upsert Products',
    },
    UPSERT_IMAGES: {
      key: 'upsertImages',
      description: 'Upsert Images',
    },
    UPSERT_USERS: {
      key: 'upsertUsers',
      description: 'Upsert Users',
    },
    UPSERT_VENDORS: {
      key: 'upsertVendors',
      description: 'Upsert Vendors',
    },
    UPSERT_WAREHOUSES: {
      key: 'upsertWarehouses',
      description: 'Upsert Warehouses',
    },
    UPSERT_CATEGORIES: {
      key: 'upsertCategories',
      description: 'Upsert Categories',
    },

    DELETE_LOCATIONS: {
      key: 'deleteLocations',
      description: 'Delete Locations',
    },
    DELETE_PRODUCTS: {
      key: 'deleteProducts',
      description: 'Delete Products',
    },
    DELETE_IMAGES: {
      key: 'deleteImages',
      description: 'Delete Images',
    },
    DELETE_USERS: {
      key: 'deleteUsers',
      description: 'Delete Users',
    },
    DELETE_VENDORS: {
      key: 'deleteVendors',
      description: 'Delete Vendors',
    },
    DELETE_WAREHOUSES: {
      key: 'deleteWarehouses',
      description: 'Delete Warehouses',
    },
    DELETE_CATEGORIES: {
      key: 'deleteCategories',
      description: 'Delete Categories',
    },

    RECEIVE_INVENTORY: {
      key: 'receiveInventory',
      description: 'Receive Inventory',
    },
    RELEASE_INVENTORY: {
      key: 'releaseInventory',
      description: 'Release Inventory',
    },
    DISPATCH_INVENTORY: {
      key: 'dispatchInventory',
      description: 'Dispatch Inventory',
    }
  },

  apiTemplates: {
    COUNT: (x : string) => `/api/v1/${_(x).pluralize().toLower()}/count`,
    CREATE: (x : string) => `/api/v1/${_(x).pluralize().toLower()}`,
    CREATE_MANY: (x : string) => `/api/v1/${_(x).pluralize().toLower()}/import`,
    DELETE: (x : string) => `/api/v1/${_(x).pluralize().toLower()}`,
    LIST: (x : string) => `/api/v1/${_(x).pluralize().toLower()}`,
    SAVE: (x : string) => `/api/v1/${_(x).pluralize().toLower()}`,
    SINGLE: (x : string) => `/api/v1/${_(x).pluralize().toLower()}`,
    TYPEAHEAD: (x : string) => `/api/v1/${_(x).pluralize().toLower()}/typeahead`,
  },

  fluxTemplates: {
    CLEAR_ERRORS: (x : string) => `CLEAR_${_(x).singularize().toUpper()}_ERRORS`,
    CLEAR_SEARCH_RESULTS: (x : string) => `CLEAR_${_(x).singularize().toUpper()}_SEARCH_RESULTS`,
    CLEAR_SEARCH: (x : string) => `CLEAR_${_(x).singularize().toUpper()}_SEARCH`,
    CREATE_ONE: (x : string) => `CREATE_${_(x).singularize().toUpper()}`,
    CREATE_MANY: (x : string) => `CREATE_${_(x).pluralize().toUpper()}`,
    COUNT: (x : string) => `COUNT_${_(x).pluralize().toUpper()}`,
    UPDATE_ONE: (x : string) => `UPDATE_${_(x).singularize().toUpper()}`,
    DELETE_ONE: (x : string) => `DELETE_${_(x).singularize().toUpper()}`,
    GET_MANY: (x : string) => `GET_${_(x).pluralize().toUpper()}`,
    GET_ONE: (x : string) => `GET_${_(x).singularize().toUpper()}`,
    SET_MANY: (x : string) => `SET_${_(x).pluralize().toUpper()}`,
    SET_ONE: (x : string) => `SET_${_(x).singularize().toUpper()}`,
    SET_COUNT: (x : string) => `SET_${_(x).pluralize().toUpper()}_COUNT`,
    SET_SEARCH_QUERY: (x : string) => `SET_${_(x).singularize().toUpper()}_SEARCH_QUERY`,
    SET_SEARCH_RESULTS: (x : string) => `SET_${_(x).singularize().toUpper()}_SEARCH_RESULTS`,
    SET_ERROR: (x : string) => `SET_${_(x).singularize().toUpper()}_ERROR`,
    SET_ERRORS: (x : string) => `SET_${_(x).singularize().toUpper()}_ERRORS`,
    SEARCH: (x : string) => `SEARCH_${_(x).pluralize().toUpper()}`,
  },

  addFluxCrud(name : string) : void {
    _.each(constants.fluxTemplates, x => constants.add(x(name)));
  },

  add(name : string) : void {
    if (constants[name]) {
      throw new Error(`Adding ${name} would overwrite existing constant.`);
    }
    constants[name] = name;
  },
};

export default constants;
