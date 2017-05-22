// import Constants from 'src/constants';
import Add from 'components/products/add';

describe('Add Product', () => {
  it('should default data', () => {
    const data = Add.data();

    expect(data).to.be.empty;
  });

  describe('methods', () => {
    it('should redirect', () => {
      const router = Add.$router = [];
      const path = {
        path: '/products',
      };

      Add.methods.redirect.apply(Add);

      expect(router).to.have.a.lengthOf(1);
      expect(router[0]).to.deep.equal(path);
    });
  });
});
