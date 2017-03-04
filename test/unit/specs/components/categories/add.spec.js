import Add from 'components/categories/add';

describe('Add Categories Component', () => {
  it('should have a name', () => {
    expect(Add.name).to.equal('addCategories');
  });

  it('should have data', () => {
    const data = Add.data();

    expect(data.category).to.be.empty;
    expect(data.isValid).to.not.be.ok;
  });

  describe('methods', () => {
    it('should redirect', () => {
      const route = {
        path: '/categories',
      };
      Add.$router = [];

      Add.methods.redirect.call(Add);

      expect(Add.$router).to.have.a.lengthOf(1);
      expect(Add.$router[0]).to.deep.equal(route);
    });

    it('should validate', () => {
      const spy = Add.$refs = {
        categoryForm: {
          validate: sinon.spy(),
        },
      };

      const result = Add.methods.validate.apply(Add);

      sinon.assert.calledOnce(spy.categoryForm.validate);
      expect(result).to.equal(spy.categoryForm.validate());
    });
  });
});
