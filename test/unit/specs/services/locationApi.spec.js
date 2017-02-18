import {
  URLSearchParams,
} from 'testUtils';
import LocationApi from 'services/locationApi';

describe('LocationApi', () => {
  let locationApi;

  beforeEach(() => {
    window.URLSearchParams = URLSearchParams;
    locationApi = new LocationApi();
  });

  afterEach(() => {
    window.URLSearchParams = null;
  });

  it('should create only a single instance', () => {
    const duplicateLocationApi = new LocationApi();

    expect(locationApi).to.be.an.instanceof(LocationApi);
    expect(duplicateLocationApi).to.be.an.instanceof(LocationApi);
    expect(locationApi).to.deep.equal(duplicateLocationApi);
  });

  it('should have the base CRUD commands', () => {
    expect(locationApi.count).to.be.an('function');
    expect(locationApi.list).to.be.an('function');
    expect(locationApi.single).to.be.an('function');
    expect(locationApi.typeahead).to.be.an('function');
    expect(locationApi.save).to.be.an('function');
    expect(locationApi.create).to.be.an('function');
    expect(locationApi.delete).to.be.an('function');
  });

  describe('count', () => {
    it('should retrieve promise', () => {
      const mock = sinon.mock(URLSearchParams);
      const promise = locationApi.count();
      mock.verify();
      expect(promise).to.be.an('Promise');
    });
  });

  describe('list', () => {
    it('should retrieve promise', () => {
      const mock = sinon.mock(URLSearchParams);
      const promise = locationApi.list();
      mock.verify();
      expect(promise).to.be.an('Promise');
    });
  });

  describe('single', () => {
    it('should retrieve promise', () => {
      const mock = sinon.mock(URLSearchParams);
      const promise = locationApi.single();
      mock.verify();
      expect(promise).to.be.an('Promise');
    });
  });

  describe('typeahead', () => {
    it('should retrieve promise', () => {
      const mock = sinon.mock(URLSearchParams);
      const promise = locationApi.typeahead();
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
      const promise = locationApi.save(thing);
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
      const promise = locationApi.create(thing);
      mock.verify();
      expect(promise).to.be.an('Promise');
    });
  });

  describe('delete', () => {
    let urlMock;
    let spy;

    beforeEach(() => {
      spy = sinon.spy(locationApi, 'delete');
      urlMock = sinon.mock(URLSearchParams);
    });

    afterEach(() => {
      spy.restore();
      urlMock.verify();
    });

    it('should retrieve promise', () => {
      const id = 1;
      const rowVersion = 1;
      const promise = locationApi.delete(id, rowVersion);
      expect(promise).to.be.an('Promise');
    });

    it('should throw an error when id is less than or equal to 0', () => {
      const errorMessage = 'id must be >= 1';
      const id = 0;
      const rowVersion = 1;

      spy.withArgs(id, rowVersion);

      expect(() => {
        locationApi.delete(id, rowVersion);
      }).to.throw(errorMessage);

      sinon.assert.threw(spy.withArgs(id, rowVersion));
    });

    it('should throw an error when rowVersion is less than or equal to 0', () => {
      const errorMessage = 'rowVersion must be >= 1';
      const id = 1;
      const rowVersion = 0;

      spy.withArgs(id, rowVersion);

      expect(() => {
        locationApi.delete(id, rowVersion);
      }).to.throw(errorMessage);

      sinon.assert.threw(spy.withArgs(id, rowVersion));
    });
  });
});
