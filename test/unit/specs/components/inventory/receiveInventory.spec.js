import ReceiveInventory from 'components/inventory/receiveInventory';

describe('Receive Inventory - Component', () => {
  describe('methods', () => {
    let methods;

    beforeEach(() => {
      methods = ReceiveInventory.methods;
    });

    it('should validate form', () => {
      const spy = ReceiveInventory.$refs = {
        inventoryForm: {
          validate: sinon.spy(),
        },
      };

      methods.validate.apply(ReceiveInventory);

      sinon.assert.calledOnce(spy.inventoryForm.validate);
    });

    it('should redirect', () => {
      const router = ReceiveInventory.$router = [];
      const route = {
        path: '/inventory',
      };

      methods.redirect.apply(ReceiveInventory);

      expect(router).to.have.a.lengthOf(1);
      expect(router[0]).to.deep.equal(route);
    });
  });
});
