import Constants from 'src/constants';
import InventoryLog from 'components/inventory/index';

describe('Inventory Log Index - Component', () => {
  it('should have a name', () => {
    expect(InventoryLog.name).to.equal('inventory');
  });

  it('should default data', () => {
    const data = InventoryLog.data();

    expect(data.searchAction).to.equal(Constants.SEARCH_INVENTORY_TRANSACTION_LOGS);
    expect(data.listAction).to.equal(Constants.GET_INVENTORY_TRANSACTION_LOGS);
    expect(data.clearAction).to.equal(Constants.CLEAR_INVENTORY_SEARCH);
  });
});
