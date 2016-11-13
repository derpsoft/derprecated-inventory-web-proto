import _ from 'lodash';
import Constants from '../constants';

const _fetch = function(url, options, {
  dispatch
}) {
  return fetch(url, options)
    .then(res => {
      if (res.status === 401) {
        dispatch(Constants.LOGOUT);
        throw new Error('Unauthorized');
      }

      if (res.status >= 500) {
        throw new Error('Server Error');
      }

      return res;
    });
};


export default class Fetchable {
  constructor(baseUrl, store) {
    if (!baseUrl) {
      throw new Error('baseUrl may not be empty');
    }
    if (!store) {
      throw new Error('store may not be empty');
    }

    this.baseUrl = baseUrl;
    this.store = store;
  }

  prepare(options) {
    const defaults = {
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json'
      }
    };
    options.credentials = 'include';
    options.headers = options.headers || new Headers();

    _.each(defaults.headers, (v, k) => {
      if (!options.headers.has(k)) {
        options.headers.set(k, v);
      }
    });

    return options;
  }

  get(url, options = {}) {
    if (!url) {
      throw new Error('url may not be empty');
    }
    options.method = 'GET';
    return _fetch(this.baseUrl + url, this.prepare(options), this.store);
  }

  post(url, options = {}) {
    if (!url) {
      throw new Error('url may not be empty');
    }
    options.method = 'POST';
    return _fetch(this.baseUrl + url, this.prepare(options), this.store);
  }
}
