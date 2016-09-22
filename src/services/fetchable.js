import SessionStore from './sessionStore';

const _fetch = function(url, options) {
  const sessionId = new SessionStore().getSessionId();

  options.headers = options.headers || new Headers();
  options.headers.set('Accept', 'application/json');
  options.headers.set('Content-Type', 'application/json');

  if (sessionId) {
    options.headers.set('X-ss-pid', sessionId);
  }

  // if (multipart) {
  //   options.headers.set('Content-Type', 'multipart/form-data');
  //
  //   let formData  = new FormData();
  //   formData.append('Asset', {...options.file, name: 'testimage.jpg', type: 'image/jpg'})
  //   options.body = formData;
  //
  // }

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
  constructor(baseUrl) {
    if (!baseUrl) {
      throw new Error('baseUrl may not be empty');
    }

    this.baseUrl = baseUrl;
  }

  get(url, options = {}) {
    if (!url) {
      throw new Error('url may not be empty');
    }
    options.method = 'GET';
    return _fetch(this.baseUrl + url, options);
  }

  post(url, options = {}) {
    if (!url) {
      throw new Error('url may not be empty');
    }
    options.method = 'POST';
    return _fetch(this.baseUrl + url, options);
  }
}
