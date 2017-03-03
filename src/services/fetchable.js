import _ from 'lodash';
import getErrorCodeHandler from 'services/apiErrorCodes';
import fetch from 'isomorphic-fetch';

const verbs = [
  'get',
  'put',
  'post',
  'patch',
  'delete',
  'search',
];

export default class Fetchable {
  constructor(baseUrl, store, fetcher = fetch) {
    if (!baseUrl || baseUrl === '') {
      throw new Error('baseUrl may not be empty');
    }
    if (!store) {
      throw new Error('store may not be empty');
    }

    this.baseUrl = baseUrl;
    this.store = store;
    this.fetch = fetcher;

    _.each(verbs, (verb) => {
      Fetchable.prototype[verb] = (url, options = {}) => {
        const opts = _.merge({}, options);
        opts.method = _(verb).toUpper();
        return this._fetch(url, this.prepare(opts), this.store);
      };
    });
  }

  deserialize(response) {
    return response.json()
      .then((json) => {
        return {
          json,
          response,
        };
      })
      .catch((e) => {
        return {
          json: {},
          error: e,
          response,
        };
      });
  }

  _fetch(url, options, {
    dispatch
  }) {
    if (!url) {
      throw new Error('url may not be empty');
    }
    return this.fetch(this.baseUrl + url, options)
      .then(res => this.deserialize(res))
      .then((res) => {
        const {
          response,
          json
        } = res;
        getErrorCodeHandler({
          dispatch,
          response,
          json,
        })();
        return json;
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

    xhr.withCredentials = true;
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
    options.headers = _.merge({}, defaults.headers, options.headers);
    options.credentials = 'include';
    options.mode = 'cors';

    return options;
  }
}
