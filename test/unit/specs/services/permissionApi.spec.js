import {
  URLSearchParams,
} from 'testUtils';
import PermissionApi from 'services/permissionApi';

describe('Permission API', () => {
  let permissionApi;

  beforeEach(() => {
    window.URLSearchParams = URLSearchParams;
    permissionApi = new PermissionApi();
  });

  afterEach(() => {
    window.URLSearchParams = null;
  });

  it('should create only a single instance', () => {
    const duplicatePermissionApi = new PermissionApi();

    expect(permissionApi).to.be.an.instanceof(PermissionApi);
    expect(duplicatePermissionApi).to.be.an.instanceof(PermissionApi);
    expect(permissionApi).to.deep.equal(duplicatePermissionApi);
  });

  describe('Setting Permissions', () => {
    it('should set user permissions', () => {
      const user = {
        id: 1,
      };
      const permissions = {};
      const promise = permissionApi.set(user, permissions);
      expect(promise).to.be.an('Promise');
    });
  });
});
