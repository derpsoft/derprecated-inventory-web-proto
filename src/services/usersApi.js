import toastr from 'toastr';
import Fetchable from './fetchable';
import store from '../stores/store';
import Constants from '../constants';

class UsersApi extends Fetchable {
  constructor() {
    super(Constants.API_ROOT, store);

    if (UsersApi.prototype.singleton) {
      return UsersApi.prototype.singleton;
    }
    UsersApi.prototype.singleton = this;

    return this;
  }

  list(skip = 0, take = 25) {
    const body = new URLSearchParams();
    body.set('skip', skip);
    body.set('take', take);

    return super.get(`/api/v1/users?${body}`)
    .then(res => res.json())
    .then((json) => {
      return json;
    })
    .catch(() => {

    });
  }

  singleById(id) {
    return super.get(`/api/v1/users/${id}`)
    .then(res => res.json())
    .then((json) => {
      return json;
    });
  }

  search(query) {
    return super.post('/api/v1/users/search', {
      body: this.toForm({ query })
    })
    .then(res => res.json());
  }

  typeahead(query) {
    const body = new URLSearchParams();
    body.set('query', query);

    return super.get(`/api/v1/users/typeahead?${body}`)
    .then(res => res.json());
  }

  save({ id, firstName, lastName, phone }) {
    const headers = new Headers();
    headers.set('content-type', 'application/json');
    const fields = {
      firstName,
      lastName,
      phone
    };
    return super.patch(`/api/v1/users/${id}`, {
      body: JSON.stringify(fields),
      headers,
    })
      .then(res => res.json())
      .then((json) => {
        return json;
      });
  }

  create({ firstName, lastName, email, phone }) {
    const headers = new Headers();
    headers.set('content-type', 'application/json');
    const fields = {
      firstName,
      lastName,
      email,
      phone
    };
    return super.post('/api/v1/users', {
      body: JSON.stringify(fields),
      headers,
    })
      .then(res => res.json())
      .then((json) => {
        return json;
      });
  }
}

export default UsersApi;
