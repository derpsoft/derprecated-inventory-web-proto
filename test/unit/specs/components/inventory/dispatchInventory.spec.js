import DispatchInventory from 'components/inventory/dispatchInventory';

describe('Dispatch Inventory - Component', () => {
  describe('methods', () => {
    let methods;

    beforeEach(() => {
      methods = DispatchInventory.methods;
    });

    it('should validate form', () => {
      const spy = DispatchInventory.$refs = {
        inventoryForm: {
          validate: sinon.spy(),
        },
      };

      methods.validate.apply(DispatchInventory);

      sinon.assert.calledOnce(spy.inventoryForm.validate);
    });

    it('should redirect', () => {
      const router = DispatchInventory.$router = [];
      const route = {
        path: '/inventory',
      };

      methods.redirect.apply(DispatchInventory);

      expect(router).to.have.a.lengthOf(1);
      expect(router[0]).to.deep.equal(route);
    });
  });
});
