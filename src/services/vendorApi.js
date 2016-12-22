import Fetchable from './fetchable';
import store from '../stores/store';
import Constants from '../constants';

class VendorApi extends Fetchable {

  constructor() {
    super(Constants.API_ROOT, store);

    if (VendorApi.prototype.singleton) {
      return VendorApi.prototype.singleton;
    }
    VendorApi.prototype.singleton = this;

    return this;
  }

  list(skip = 0, take = 25) {
    const body = new URLSearchParams();
    body.set('skip', skip);
    body.set('take', take);

    return super.get(`/api/v1/vendors?${body}`)
    .then(res => res.json())
    .then((json) => {
      return json.vendors;
    });
  }

  single(id) {
    return super.get(`/api/v1/vendors/${id}`)
    .then(res => res.json())
    .then((json) => {
      return json.vendor;
    });
  }

  search(query) {
    return super.post('/api/v1/vendors/search', {
      body: this.toForm({ query })
    })
    .then(res => res.json());
  }

  save(vendor) {
    const id = vendor.id;
    const headers = new Headers();
    headers.set('content-type', 'application/json');
    delete vendor.id;
    return super.put(`/api/v1/vendors/${id}`, {
      body: this.toJson({ vendor }),
      headers
    })
    .then(res => res.json());
  }

  create(vendor) {
    const headers = new Headers();
    headers.set('content-type', 'application/json');
    return super.post('/api/v1/vendors', {
      body: this.toJson({ vendor }),
      headers
    })
    .then(res => res.json());
  }
}

export default VendorApi;
