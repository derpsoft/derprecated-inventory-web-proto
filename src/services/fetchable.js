import _ from 'lodash';
import getErrorCodeHandler from 'services/apiErrorCodes';
import {
  fetch as defaultFetch
} from 'isomorphic-fetch';

const verbs = [
  'get',
  'put',
  'post',
  'patch',
  'delete',
  'search',
];

export default class Fetchable {
  constructor(baseUrl, store, fetch = defaultFetch) {
    if (!baseUrl || baseUrl === '') {
      throw new Error('baseUrl may not be empty');
    }
    if (!store) {
      throw new Error('store may not be empty');
    }

    this.baseUrl = baseUrl;
    this.store = store;
    this.fetch = fetch;

    _.each(verbs, (v) => {
      this[v] = (url, options = {}) => {
        if (!url) {
          throw new Error('url may not be empty');
        }
        options.method = _(v).toUpper();
        return this._fetch(this.baseUrl + url, this.prepare(options), this.store);
      };
    });
  }

  _fetch(url, options, {
    dispatch
  }) {
    // console.log(url, options);
    return this.fetch(url, options)
      .then((res) => {
        console.log(res);
        getErrorCodeHandler({
          dispatch,
          code: res.status
        })();
        return res;
      });
  }

  toForm(body) {
    const form = new FormData();
    _.each(body, (v, k) => {
      form.append(k, v);
    });
    return form;
  }

  toJson(body) {
    return JSON.stringify(body);
  }

  prepareXhr(xhr) {
    const defaults = {
      headers: {
        Accept: 'application/json',
      }
    };

    _.each(defaults.headers, (v, k) => {
      xhr.setRequestHeader(k, v);
    });
  }

  prepare(options) {
    const defaults = {
      headers: {
        Accept: 'application/json',
      }
    };
    options.headers = options.headers || new Headers();
    options.credentials = 'include';
    options.mode = 'cors';

    _.each(defaults.headers, (v, k) => {
      if (!options.headers.has(k)) {
        options.headers.set(k, v);
      }
    });

    return options;
  }
}
