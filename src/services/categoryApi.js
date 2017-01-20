import Fetchable from './fetchable';
import store from '../stores/store';
import Constants from '../constants';

class CategoryApi extends Fetchable {

  constructor() {
    super(Constants.API_ROOT, store);

    if (CategoryApi.prototype.singleton) {
      return CategoryApi.prototype.singleton;
    }
    CategoryApi.prototype.singleton = this;

    return this;
  }

  count() {
    return super.get('/api/v1/categories/count')
    .then(res => res.json())
    .then(json => json.result);
  }

  list(skip = 0, take = 25) {
    const body = new URLSearchParams();
    body.set('skip', skip);
    body.set('take', take);

    return super.get(`/api/v1/categories?${body}`)
    .then(res => res.json())
    .then(json => json.result);
  }

  single(id) {
    return super.get(`/api/v1/categories/${id}`)
    .then(res => res.json())
    .then(json => json.result);
  }

  search(query) {
    return super.post('/api/v1/categories/search', {
      body: this.toForm({ query })
    })
    .then(res => res.json());
  }

  typeahead(query) {
    const body = new URLSearchParams();
    body.set('query', query);

    return super.get(`/api/v1/categories/typeahead?${body}`)
    .then(res => res.json())
    .then(json => json.result);
  }

  save(category) {
    const id = category.id;
    const headers = new Headers();
    headers.set('content-type', 'application/json');
    delete category.id;
    return super.put(`/api/v1/categories/${id}`, {
      body: this.toJson(category),
      headers
    })
    .then(res => res.json())
    .then(json => json.result);
  }

  create(category) {
    const headers = new Headers();
    headers.set('content-type', 'application/json');
    return super.post('/api/v1/categories', {
      body: this.toJson(category),
      headers
    })
    .then(res => res.json())
    .then(json => json.result);
  }
}

export default CategoryApi;
