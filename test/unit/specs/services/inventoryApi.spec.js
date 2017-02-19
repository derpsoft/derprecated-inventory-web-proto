import {
  URLSearchParams,
} from 'testUtils';
import InventoryApi from 'services/inventoryApi';

describe('InventoryApi', () => {
  let inventoryApi;

  beforeEach(() => {
    window.URLSearchParams = URLSearchParams;
    inventoryApi = new InventoryApi();
  });

  afterEach(() => {
    window.URLSearchParams = null;
  });

  it('should create only a single instance', () => {
    const duplicateInventoryApi = new InventoryApi();

    expect(inventoryApi).to.be.an.instanceof(InventoryApi);
    expect(duplicateInventoryApi).to.be.an.instanceof(InventoryApi);
    expect(inventoryApi).to.deep.equal(duplicateInventoryApi);
  });

  describe('Receive Inventory', () => {
    let spy;

    beforeEach(() => {
      spy = sinon.spy(inventoryApi, 'receiveInventory');
    });

    afterEach(() => {
      spy.restore();
    });

    it('should create transaction', () => {
      const xact = {
        quantity: 1,
      };
      const promise = inventoryApi.receiveInventory(xact);
      expect(promise).to.be.an('Promise');
    });

    it('should throw an error when quantity is lower or equal than 0', () => {
      const errorMessage = 'quantity must be >= 0';
      const xact = {
        quantity: 0,
      };

      spy.withArgs(xact);

      expect(() => {
        inventoryApi.receiveInventory(xact);
      }).to.throw(errorMessage);

      sinon.assert.threw(spy.withArgs(xact));
    });
  });

  describe('Dispatch Inventory', () => {
    let spy;

    beforeEach(() => {
      spy = sinon.spy(inventoryApi, 'dispatchInventory');
    });

    afterEach(() => {
      spy.restore();
    });

    it('should create transaction', () => {
      const xact = {
        quantity: -1,
      };
      const promise = inventoryApi.dispatchInventory(xact);
      expect(promise).to.be.an('Promise');
    });

    it('should throw an error when quantity is greater or equal than 0', () => {
      const errorMessage = 'quantity must be <= 0';
      const xact = {
        quantity: 0,
      };

      spy.withArgs(xact);

      expect(() => {
        inventoryApi.dispatchInventory(xact);
      }).to.throw(errorMessage);

      sinon.assert.threw(spy.withArgs(xact));
    });
  });

  describe('Get Logs', () => {
    it('should get logs', () => {
      const skip = 0;
      const take = 25;
      const spy = sinon.spy(inventoryApi, 'searchLogs');
      spy.withArgs(skip, take);

      inventoryApi.getLogs(skip, take);

      sinon.assert.calledOnce(spy);
      spy.calledWith(skip, take);
    });
  });

  describe('Count Logs', () => {
    it('should get transaction counts', () => {
      const promise = inventoryApi.countLogs();

      expect(promise).to.be.an('Promise');
    });
  });

  describe('Search Logs', () => {
    it('should search logs', () => {
      const skip = 0;
      const take = 25;
      const promise = inventoryApi.searchLogs(skip, take);

      expect(promise).to.be.an('Promise');
    });
  });
});
