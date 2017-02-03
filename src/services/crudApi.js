import _ from 'lodash';
import inflection from 'lodash-inflection';
import store from '../stores/store';
import fetchable from './fetchable';

_.mixin(inflection);

const t = {
  COUNT: x => `/api/v1/${_(x).pluralize().toLower()}/count`,
  CREATE: x => `/api/v1/${_(x).pluralize().toLower()}`,
  DELETE: x => `/api/v1/${_(x).pluralize().toLower()}`,
  LIST: x => `/api/v1/${_(x).pluralize().toLower()}`,
  SAVE: x => `/api/v1/${_(x).pluralize().toLower()}`,
  SINGLE: x => `/api/v1/${_(x).pluralize().toLower()}`,
  TYPEAHEAD: x => `/api/v1/${_(x).pluralize().toLower()}/typeahead`,
};

class CrudApi extends Fetchable {
  constructor(name, routes = {}) {
    super(Constants.API_ROOT, store);
    this.routes = _.merge(t, routes);
    this.name = name;
    this.one = _(name).singularize().toLower();
    this.many _(one).pluralize();
  }

  count(includeDeleted = false) {
    const body = new URLSearchParams();
    body.set('includeDeleted', includeDeleted);

    return super
      .get(`${this.routes.COUNT(this.name)}?${body}`)
      .then(res => res.json())
      .then(json => json.result);
  }

  list(skip = 0, take = 25, includeDeleted = false) {
    const body = new URLSearchParams();
    body.set('skip', skip);
    body.set('take', take);
    body.set('includeDeleted', includeDeleted);

    return super
      .get(`${this.routes.LIST(this.name)}?${body}`)
      .then(res => res.json())
      .then(json => json.result);
  }

  single(id, includeDeleted = false) {
    const body = new URLSearchParams();
    body.set('includeDeleted', includeDeleted);

    return super
      .get(`${this.routes.SINGLE(this.name)}/${id}?${body}`)
      .then(res => res.json())
      .then(json => json.result);
  }

  typeahead(query, includeDeleted = false) {
    const body = new URLSearchParams();
    body.set('query', query);
    body.set('includeDeleted', includeDeleted);

    return super
      .search(`${this.routes.TYPEAHEAD(this.name)}?${body}`)
      .then(res => res.json())
      .then(json => json.result);
  }

  save(thing) {
    const id = thing.id;
    const headers = new Headers();
    headers.set('content-type', 'application/json');
    delete thing.id;

    return super
      .put(`${this.routes.SAVE(this.name)}/${id}`, {
        body: this.toJson(thing),
        headers
      })
      .then(res => res.json())
      .then(json => json.result);
  }

  create(thing) {
    const headers = new Headers();
    headers.set('content-type', 'application/json');
    delete thing.id;
    return super
      .post(this.routes.CREATE(this.name), {
        body: this.toJson(thing),
        headers
      })
      .then(res => res.json())
      .then(json => json.result);
  }

  delete(id) {
    if (id < 1) {
      throw new Error('id must be >= 1');
    }
    return super
      .delete(`${this.routes.DELETE(this.name)}/${id}`)
      .then(res => res.json())
      .then(json => json.result);
  }
}

export default CrudApi;
