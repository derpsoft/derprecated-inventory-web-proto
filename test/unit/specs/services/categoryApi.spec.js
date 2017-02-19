import {
  URLSearchParams,
} from 'testUtils';
import CategoryApi from 'services/categoryApi';

describe('CategoryApi', () => {
  let categoryApi;

  beforeEach(() => {
    window.URLSearchParams = URLSearchParams;
    categoryApi = new CategoryApi();
  });

  afterEach(() => {
    window.URLSearchParams = null;
  });

  it('should create only a single instance', () => {
    const duplicateCategoryApi = new CategoryApi();

    expect(categoryApi).to.be.an.instanceof(CategoryApi);
    expect(duplicateCategoryApi).to.be.an.instanceof(CategoryApi);
    expect(categoryApi).to.deep.equal(duplicateCategoryApi);
  });

  it('should have the base CRUD commands', () => {
    expect(categoryApi.count).to.be.an('function');
    expect(categoryApi.list).to.be.an('function');
    expect(categoryApi.single).to.be.an('function');
    expect(categoryApi.typeahead).to.be.an('function');
    expect(categoryApi.save).to.be.an('function');
    expect(categoryApi.create).to.be.an('function');
    expect(categoryApi.delete).to.be.an('function');
  });

  describe('count', () => {
    it('should retrieve promise', () => {
      const mock = sinon.mock(URLSearchParams);
      const promise = categoryApi.count();
      mock.verify();
      expect(promise).to.be.an('Promise');
    });
  });

  describe('list', () => {
    it('should retrieve promise', () => {
      const mock = sinon.mock(URLSearchParams);
      const promise = categoryApi.list();
      mock.verify();
      expect(promise).to.be.an('Promise');
    });
  });

  describe('single', () => {
    it('should retrieve promise', () => {
      const mock = sinon.mock(URLSearchParams);
      const promise = categoryApi.single();
      mock.verify();
      expect(promise).to.be.an('Promise');
    });
  });

  describe('typeahead', () => {
    it('should retrieve promise', () => {
      const mock = sinon.mock(URLSearchParams);
      const promise = categoryApi.typeahead();
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
      const promise = categoryApi.save(thing);
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
      const promise = categoryApi.create(thing);
      mock.verify();
      expect(promise).to.be.an('Promise');
    });
  });

  describe('delete', () => {
    let urlMock;
    let spy;

    beforeEach(() => {
      spy = sinon.spy(categoryApi, 'delete');
      urlMock = sinon.mock(URLSearchParams);
    });

    afterEach(() => {
      spy.restore();
      urlMock.verify();
    });

    it('should retrieve promise', () => {
      const id = 1;
      const rowVersion = 1;
      const promise = categoryApi.delete(id, rowVersion);
      expect(promise).to.be.an('Promise');
    });

    it('should throw an error when id is less than or equal to 0', () => {
      const errorMessage = 'id must be >= 1';
      const id = 0;
      const rowVersion = 1;

      spy.withArgs(id, rowVersion);

      expect(() => {
        categoryApi.delete(id, rowVersion);
      }).to.throw(errorMessage);

      sinon.assert.threw(spy.withArgs(id, rowVersion));
    });

    it('should throw an error when rowVersion is less than or equal to 0', () => {
      const errorMessage = 'rowVersion must be >= 1';
      const id = 1;
      const rowVersion = 0;

      spy.withArgs(id, rowVersion);

      expect(() => {
        categoryApi.delete(id, rowVersion);
      }).to.throw(errorMessage);

      sinon.assert.threw(spy.withArgs(id, rowVersion));
    });
  });
});
