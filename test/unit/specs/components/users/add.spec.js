import _ from 'lodash';
import Constants from 'src/constants';
import Add from 'components/users/add';

describe('Add User', () => {
  it('should default data', () => {
    const data = Add.data();

    expect(data.user).to.be.empty;
    expect(data.permissions).to.be.empty;
  });

  describe('computed', () => {
    it('should return id', () => {
      const route = Add.$route = {
        params: {
          id: 1,
        },
      };

      const id = Add.computed.id.apply(Add);

      expect(id).to.equal(route.params.id);
    });

    it('should return all permissions', () => {
      const values = _.values(Constants.permissions);

      const allPermissions = Add.computed.allPermissions.apply(Add);

      expect(allPermissions).to.deep.equal(values);
    });
  });

  describe('methods', () => {
    it('should redirect', () => {
      const router = Add.$router = [];
      const path = {
        path: '/users',
      };

      Add.methods.redirect.apply(Add);

      expect(router).to.have.a.lengthOf(1);
      expect(router[0]).to.deep.equal(path);
    });

    it('should save', () => {
      const user = Add.user = 'derp';
      const permissions = Add.permissions = {};
      const redirect = Add.redirect = () => {};
      const params = {
        user,
        permissions,
        redirect,
      };

      const spy = Add.$store = {
        dispatch: sinon.spy(),
      };

      Add.methods.save.apply(Add);

      expect(spy.dispatch).to.have.been.calledWith(Constants.CREATE_USER, params);
    });
  });
});
