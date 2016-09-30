import _ from 'lodash';

const _fetch = function(url, options) {
  return fetch(url, options)
    .then(res => {
      return res.json()
        .then((json) => {
          const status = json.responseStatus || {};
          if (status.errorCode) {
            throw new Error(status.message);
          }

          if (res.status === 401) {
            throw new Error('Unauthorized');
          }

          if (res.status >= 500) {
            throw new Error('Server Error');
          }

          return json;
        });
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
    const sessionId = this.store.getters.sessionId;
    const defaults = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
    options.headers = options.headers || new Headers();

    _.each(defaults.headers, (v, k) => {
      if (!options.headers.has(k)) {
        options.headers.set(k, v);
      }
    });

    if (sessionId) {
      options.headers.set('X-ss-pid', sessionId);
    }

    return options;
  }

  get(url, options = {}) {
    if (!url) {
      throw new Error('url may not be empty');
    }
    options.method = 'GET';
    return _fetch(this.baseUrl + url, this.prepare(options));
  }

  post(url, options = {}) {
    if (!url) {
      throw new Error('url may not be empty');
    }
    options.method = 'POST';
    return _fetch(this.baseUrl + url, this.prepare(options));
  }
}
