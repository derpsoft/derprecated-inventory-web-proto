import CrudApi from 'services/crudApi';

export default class UsersApi extends CrudApi {
  constructor() {
    super('user');

    if (UsersApi.prototype.singleton) {
      return UsersApi.prototype.singleton;
    }
    UsersApi.prototype.singleton = this;

    return this;
  }

  typeahead(query, includeDeleted = false) {
    const body = new URLSearchParams();
    body.set('query', query);
    body.set('includeDeleted', includeDeleted);

    return super
      .get(`${this.routes.TYPEAHEAD(this.name)}?${body}`)
      .then(json => json.result);
  }
}
