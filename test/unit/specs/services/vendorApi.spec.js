import {
  URLSearchParams,
} from 'testUtils';
import VendorApi from 'services/vendorApi';

describe('VendorApi', () => {
  let vendorApi;

  beforeEach(() => {
    vendorApi = new VendorApi();
  });

  it('should create only a single instance', () => {
    const duplicateVendorApi = new VendorApi();

    expect(vendorApi).to.be.an.instanceof(VendorApi);
    expect(duplicateVendorApi).to.be.an.instanceof(VendorApi);
    expect(vendorApi).to.deep.equal(duplicateVendorApi);
  });

  it('should have the base CRUD commands', () => {
    expect(vendorApi.count).to.be.an('function');
    expect(vendorApi.list).to.be.an('function');
    expect(vendorApi.single).to.be.an('function');
    expect(vendorApi.typeahead).to.be.an('function');
    expect(vendorApi.save).to.be.an('function');
    expect(vendorApi.create).to.be.an('function');
    expect(vendorApi.delete).to.be.an('function');
  });

  describe('count', () => {
    it('should retrieve promise', () => {
      const mock = sinon.mock(URLSearchParams);
      const promise = vendorApi.count();
      mock.verify();
      expect(promise).to.be.an('Promise');
    });
  });

  describe('list', () => {
    it('should retrieve promise', () => {
      const mock = sinon.mock(URLSearchParams);
      const promise = vendorApi.list();
      mock.verify();
      expect(promise).to.be.an('Promise');
    });
  });

  describe('single', () => {
    it('should retrieve promise', () => {
      const mock = sinon.mock(URLSearchParams);
      const promise = vendorApi.single();
      mock.verify();
      expect(promise).to.be.an('Promise');
    });
  });

  describe('typeahead', () => {
    it('should retrieve promise', () => {
      const mock = sinon.mock(URLSearchParams);
      const promise = vendorApi.typeahead();
      mock.verify();
      expect(promise).to.be.an('Promise');
    });
  });

  describe('save', () => {
    it('should retrieve promise', () => {
      const thing = {
        id: 1,
      };
      const mock = sinon.mock(URLSearchParams);
      const promise = vendorApi.save(thing);
      mock.verify();
      expect(promise).to.be.an('Promise');
    });
  });

  describe('create', () => {
    it('should retrieve promise', () => {
      const thing = {
        id: 1,
      };
      const mock = sinon.mock(URLSearchParams);
      const promise = vendorApi.create(thing);
      mock.verify();
      expect(promise).to.be.an('Promise');
    });
  });

  describe('delete', () => {
    let urlMock;
    let spy;

    beforeEach(() => {
      spy = sinon.spy(vendorApi, 'delete');
      urlMock = sinon.mock(URLSearchParams);
    });

    afterEach(() => {
      spy.restore();
      urlMock.verify();
    });

    it('should retrieve promise', () => {
      const id = 1;
      const rowVersion = 1;
      const promise = vendorApi.delete(id, rowVersion);
      expect(promise).to.be.an('Promise');
    });

    it('should throw an error when id is less than or equal to 0', () => {
      const errorMessage = 'id must be >= 1';
      const id = 0;
      const rowVersion = 1;

      spy.withArgs(id, rowVersion);

      expect(() => {
        vendorApi.delete(id, rowVersion);
      }).to.throw(errorMessage);

      sinon.assert.threw(spy.withArgs(id, rowVersion));
    });

    it('should throw an error when rowVersion is less than or equal to 0', () => {
      const errorMessage = 'rowVersion must be >= 1';
      const id = 1;
      const rowVersion = 0;

      spy.withArgs(id, rowVersion);

      expect(() => {
        vendorApi.delete(id, rowVersion);
      }).to.throw(errorMessage);

      sinon.assert.threw(spy.withArgs(id, rowVersion));
    });
  });
});
