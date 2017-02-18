import {
  URLSearchParams,
} from 'testUtils';
import SaleApi from 'services/saleApi';

describe('saleApi', () => {
  let saleApi;

  beforeEach(() => {
    window.URLSearchParams = URLSearchParams;
    saleApi = new SaleApi();
  });

  afterEach(() => {
    window.URLSearchParams = null;
  });

  it('should create only a single instance', () => {
    const duplicateSaleApi = new SaleApi();

    expect(saleApi).to.be.an.instanceof(SaleApi);
    expect(duplicateSaleApi).to.be.an.instanceof(SaleApi);
    expect(saleApi).to.deep.equal(duplicateSaleApi);
  });

  it('should have the base CRUD commands', () => {
    expect(saleApi.count).to.be.an('function');
    expect(saleApi.list).to.be.an('function');
    expect(saleApi.single).to.be.an('function');
    expect(saleApi.typeahead).to.be.an('function');
    expect(saleApi.save).to.be.an('function');
    expect(saleApi.create).to.be.an('function');
    expect(saleApi.delete).to.be.an('function');
  });

  describe('count', () => {
    it('should retrieve promise', () => {
      const mock = sinon.mock(URLSearchParams);
      const promise = saleApi.count();
      mock.verify();
      expect(promise).to.be.an('Promise');
    });
  });

  describe('list', () => {
    it('should retrieve promise', () => {
      const mock = sinon.mock(URLSearchParams);
      const promise = saleApi.list();
      mock.verify();
      expect(promise).to.be.an('Promise');
    });
  });

  describe('single', () => {
    it('should retrieve promise', () => {
      const mock = sinon.mock(URLSearchParams);
      const promise = saleApi.single();
      mock.verify();
      expect(promise).to.be.an('Promise');
    });
  });

  describe('typeahead', () => {
    it('should retrieve promise', () => {
      const mock = sinon.mock(URLSearchParams);
      const promise = saleApi.typeahead();
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
      const promise = saleApi.save(thing);
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
      const promise = saleApi.create(thing);
      mock.verify();
      expect(promise).to.be.an('Promise');
    });
  });

  describe('delete', () => {
    let urlMock;
    let spy;

    beforeEach(() => {
      spy = sinon.spy(saleApi, 'delete');
      urlMock = sinon.mock(URLSearchParams);
    });

    afterEach(() => {
      spy.restore();
      urlMock.verify();
    });

    it('should retrieve promise', () => {
      const id = 1;
      const rowVersion = 1;
      const promise = saleApi.delete(id, rowVersion);
      expect(promise).to.be.an('Promise');
    });

    it('should throw an error when id is less than or equal to 0', () => {
      const errorMessage = 'id must be >= 1';
      const id = 0;
      const rowVersion = 1;

      spy.withArgs(id, rowVersion);

      expect(() => {
        saleApi.delete(id, rowVersion);
      }).to.throw(errorMessage);

      sinon.assert.threw(spy.withArgs(id, rowVersion));
    });

    it('should throw an error when rowVersion is less than or equal to 0', () => {
      const errorMessage = 'rowVersion must be >= 1';
      const id = 1;
      const rowVersion = 0;

      spy.withArgs(id, rowVersion);

      expect(() => {
        saleApi.delete(id, rowVersion);
      }).to.throw(errorMessage);

      sinon.assert.threw(spy.withArgs(id, rowVersion));
    });
  });
});
