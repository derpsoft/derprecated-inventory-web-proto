import {
  URLSearchParams,
} from 'testUtils';
import WarehouseApi from 'services/warehouseApi';

describe('warehouseApi', () => {
  let warehouseApi;

  beforeEach(() => {
    window.URLSearchParams = URLSearchParams;
    warehouseApi = new WarehouseApi();
  });

  afterEach(() => {
    window.URLSearchParams = null;
  });

  it('should create only a single instance', () => {
    const duplicateWarehouseApi = new WarehouseApi();

    expect(warehouseApi).to.be.an.instanceof(WarehouseApi);
    expect(duplicateWarehouseApi).to.be.an.instanceof(WarehouseApi);
    expect(warehouseApi).to.deep.equal(duplicateWarehouseApi);
  });

  it('should have the base CRUD commands', () => {
    expect(warehouseApi.count).to.be.an('function');
    expect(warehouseApi.list).to.be.an('function');
    expect(warehouseApi.single).to.be.an('function');
    expect(warehouseApi.typeahead).to.be.an('function');
    expect(warehouseApi.save).to.be.an('function');
    expect(warehouseApi.create).to.be.an('function');
    expect(warehouseApi.delete).to.be.an('function');
  });

  describe('count', () => {
    it('should retrieve promise', () => {
      const mock = sinon.mock(URLSearchParams);
      const promise = warehouseApi.count();
      mock.verify();
      expect(promise).to.be.an('Promise');
    });
  });

  describe('list', () => {
    it('should retrieve promise', () => {
      const mock = sinon.mock(URLSearchParams);
      const promise = warehouseApi.list();
      mock.verify();
      expect(promise).to.be.an('Promise');
    });
  });

  describe('single', () => {
    it('should retrieve promise', () => {
      const mock = sinon.mock(URLSearchParams);
      const promise = warehouseApi.single();
      mock.verify();
      expect(promise).to.be.an('Promise');
    });
  });

  describe('typeahead', () => {
    it('should retrieve promise', () => {
      const mock = sinon.mock(URLSearchParams);
      const promise = warehouseApi.typeahead();
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
      const promise = warehouseApi.save(thing);
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
      const promise = warehouseApi.create(thing);
      mock.verify();
      expect(promise).to.be.an('Promise');
    });
  });

  describe('delete', () => {
    let urlMock;
    let spy;

    beforeEach(() => {
      spy = sinon.spy(warehouseApi, 'delete');
      urlMock = sinon.mock(URLSearchParams);
    });

    afterEach(() => {
      spy.restore();
      urlMock.verify();
    });

    it('should retrieve promise', () => {
      const id = 1;
      const rowVersion = 1;
      const promise = warehouseApi.delete(id, rowVersion);
      expect(promise).to.be.an('Promise');
    });

    it('should throw an error when id is less than or equal to 0', () => {
      const errorMessage = 'id must be >= 1';
      const id = 0;
      const rowVersion = 1;

      spy.withArgs(id, rowVersion);

      expect(() => {
        warehouseApi.delete(id, rowVersion);
      }).to.throw(errorMessage);

      sinon.assert.threw(spy.withArgs(id, rowVersion));
    });

    it('should throw an error when rowVersion is less than or equal to 0', () => {
      const errorMessage = 'rowVersion must be >= 1';
      const id = 1;
      const rowVersion = 0;

      spy.withArgs(id, rowVersion);

      expect(() => {
        warehouseApi.delete(id, rowVersion);
      }).to.throw(errorMessage);

      sinon.assert.threw(spy.withArgs(id, rowVersion));
    });
  });
});
