import {
  URLSearchParams,
} from 'testUtils';
import UserApi from 'services/userApi';

describe('User API', () => {
  let userApi;

  beforeEach(() => {
    window.URLSearchParams = URLSearchParams;
    userApi = new UserApi();
  });

  afterEach(() => {
    window.URLSearchParams = null;
  });

  it('should create only a single instance', () => {
    const duplicateUserApi = new UserApi();

    expect(userApi).to.be.an.instanceof(UserApi);
    expect(duplicateUserApi).to.be.an.instanceof(UserApi);
    expect(userApi).to.deep.equal(duplicateUserApi);
  });

  it('should have the base CRUD commands', () => {
    expect(userApi.count).to.be.an('function');
    expect(userApi.list).to.be.an('function');
    expect(userApi.single).to.be.an('function');
    expect(userApi.typeahead).to.be.an('function');
    expect(userApi.save).to.be.an('function');
    expect(userApi.create).to.be.an('function');
    expect(userApi.delete).to.be.an('function');
  });

  describe('Typeahead', () => {
    it('should return a value when using typeahead', () => {
      const query = {};
      const includeDeleted = false;
      const promise = userApi.typeahead(query, includeDeleted);

      expect(promise).to.be.an('Promise');
    });
  });
});
