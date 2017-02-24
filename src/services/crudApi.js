import _ from 'lodash';
import inflection from 'lodash-inflection';
import Fetchable from 'services/fetchable';
import store from 'stores/store';
import Constants from 'src/constants';

_.mixin(inflection);

const t = {
  COUNT: x => `/api/v1/${_(x).pluralize().toLower()}/count`,
  CREATE: x => `/api/v1/${_(x).pluralize().toLower()}`,
  CREATE_MANY: x => `/api/v1/${_(x).pluralize().toLower()}/import`,
  DELETE: x => `/api/v1/${_(x).pluralize().toLower()}`,
  LIST: x => `/api/v1/${_(x).pluralize().toLower()}`,
  SAVE: x => `/api/v1/${_(x).pluralize().toLower()}`,
  SINGLE: x => `/api/v1/${_(x).pluralize().toLower()}`,
  TYPEAHEAD: x => `/api/v1/${_(x).pluralize().toLower()}/typeahead`,
};

export default class CrudApi extends Fetchable {
  constructor(name, routes = {}) {
    super(Constants.API_ROOT, store);
    this.routes = _.merge(t, routes);
    this.name = name;
    this.one = _(name).singularize().toLower();
    this.many = _(name).pluralize().toLower();
  }

  count(includeDeleted = false) {
    const body = new URLSearchParams();
    body.set('includeDeleted', includeDeleted);

    return super
      .get(`${this.routes.COUNT(this.name)}?${body}`)
      .then(json => json.result);
  }

  list(skip = 0, take = 25, includeDeleted = false) {
    const body = new URLSearchParams();
    body.set('skip', skip);
    body.set('take', take);
    body.set('includeDeleted', includeDeleted);

    return super
      .get(`${this.routes.LIST(this.name)}?${body}`)
      .then(json => json.result || json[this.many]);
  }

  single(id, includeDeleted = false) {
    const body = new URLSearchParams();
    body.set('includeDeleted', includeDeleted);

    return super
      .get(`${this.routes.SINGLE(this.name)}/${id}?${body}`)
      .then(json => json.result || json[this.one]);
  }

  typeahead(query, includeDeleted = false) {
    const body = new URLSearchParams();
    body.set('query', query);
    body.set('includeDeleted', includeDeleted);

    return super
      .search(`${this.routes.TYPEAHEAD(this.name)}?${body}`)
      .then(json => json.result);
  }

  save(thing) {
    const id = thing.id;
    const headers = {
      'Content-Type': 'application/json',
    };
    delete thing.id;

    return super
      .put(`${this.routes.SAVE(this.name)}/${id}`, {
        body: this.toJson(thing),
        headers
      })
      .then(json => json.result || json[this.one]);
  }

  create(thing) {
    const headers = {
      'Content-Type': 'application/json',
    };
    delete thing.id;
    return super
      .post(this.routes.CREATE(this.name), {
        body: this.toJson(thing),
        headers
      })
      .then(json => json.result || json[this.one]);
  }

  createMany(things) {
    const headers = {
      'Content-Type': 'application/json',
    };

    return super
      .post(this.routes.CREATE_MANY(this.name), {
        body: this.toJson({
          [this.many]: things
        }),
        headers
      })
      .then(json => json.result || json[this.many]);
  }

  delete(id, rowVersion) {
    if (id < 1) {
      throw new Error('id must be >= 1');
    }
    if (rowVersion < 1) {
      throw new Error('rowVersion must be >= 1');
    }
    const body = new URLSearchParams();
    body.set('rowVersion', rowVersion);
    return super
      .delete(`${this.routes.DELETE(this.name)}/${id}?${body}`)
      .then(json => json.result || json[this.one]);
  }
}
