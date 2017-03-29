// @flow

import _ from 'lodash';
import getErrorCodeHandler from 'services/apiErrorCodes';
import fetch from 'isomorphic-fetch';

export default class Fetchable {
  baseUrl : string;
  store : Object;
  fetch : Function;
  prepare : Function;
  store : Object;

  constructor(baseUrl : string, store : any, fetcher : Function = fetch) {
    if (!baseUrl || baseUrl === '') {
      throw new Error('baseUrl may not be empty');
    }
    if (!store) {
      throw new Error('store may not be empty');
    }

    this.baseUrl = baseUrl;
    this.store = store;
    this.fetch = fetcher;
  }

  request(verb: string, url : string, options : any = {}) : Promise<Object> {
    const opts = _.merge({}, options);
    opts.method = _(verb).toUpper();
    return this._fetch(url, this.prepare(opts), this.store);
  }

  get(url : string, options : any = {}) : Promise<Object> {
    return this.request('GET', url, options);
  }

  put(url : string, options : any = {}) : Promise<Object> {
    return this.request('PUT', url, options);
  }

  post(url : string, options : any = {}) : Promise<Object> {
    return this.request('POST', url, options);
  }

  patch(url : string, options : any = {}) : Promise<Object> {
    return this.request('PATCH', url, options);
  }

  delete(url : string, options : any = {}) : Promise<Object> {
    return this.request('DELETE', url, options);
  }

  search(url : string, options : any = {}) : Promise<Object> {
    return this.request('SEARCH', url, options);
  }

  deserialize(response : Object) : Promise<Object> {
    return response.json().then((json) => {
      return { json, response };
    }).catch((e) => {
      return { json: {}, error: e, response };
    });
  }

  _fetch(url : string, options : Object, { dispatch } :*) : Promise<Object> {
    if (!url) {
      throw new Error('url may not be empty');
    }
    return this.fetch(this.baseUrl + url, options)
      .then(res => this.deserialize(res))
      .then((res) => {
        const { response, json } = res;
        getErrorCodeHandler({ dispatch, response, json })();
        return json;
      });
  }

  toForm(body : Object) : Object {
    const form = new FormData();
    _.each(body, (v, k) => {
      form.append(k, v);
    });
    return form;
  }

  toJson(body : Object) : string {
    return JSON.stringify(body);
  }

  prepareXhr(xhr : XMLHttpRequest) : void {
    const defaults = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.store.getters.tokens.idToken}`
      }
    };

    xhr.withCredentials = false;
    _.each(defaults.headers, (v, k) => {
      xhr.setRequestHeader(k, v);
    });
  }

  prepare(options : Object) : Object {
    const defaults = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.store.getters.tokens.idToken}`
      }
    };
    options.headers = _.merge({}, defaults.headers, options.headers);
    options.credentials = 'omit';
    options.mode = 'cors';

    return options;
  }
}
