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
    .then(json => {
      return json;
    });
  }

  search(query) {
    return super.post('/api/v1/users/search', {
      body: this.toForm({ query })
    })
    .then(res => res.json());
  }

  updateFirstName(id, firstName) {
    const fields = {
      value: firstName,
    };
    return super.post(`/api/v1/user/${id}/firstName`, {
      body: JSON.stringify(fields)
    })
      .then(res => res.json())
      .then(json => {
        return json;
      });
  }

  updateLastName(id, lastName) {
    const fields = {
      value: lastName,
    };
    return super.post(`/api/v1/user/${id}/lastName`, {
      body: JSON.stringify(fields)
    })
      .then(res => res.json())
      .then(json => {
        return json;
      });
  }
}

export default UsersApi;
