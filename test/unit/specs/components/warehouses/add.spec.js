// import Constants from 'src/constants';
import Add from 'components/warehouses/add';

describe('Add Warehouse', () => {
  it('should default data', () => {
    const data = Add.data();

    expect(data.warehouse).to.be.empty;
  });

  describe('methods', () => {
    it('should redirect', () => {
      const router = Add.$router = [];
      const path = {
        path: '/warehouses',
      };

      Add.methods.redirect.apply(Add);

      expect(router).to.have.a.lengthOf(1);
      expect(router[0]).to.deep.equal(path);
    });

    it('should validate', () => {
      const spy = Add.$validator = {
        validateAll: sinon.spy(),
      };

      Add.methods.validate.apply(Add);

      expect(spy.validateAll).to.have.been.called;
    });
  });
});
