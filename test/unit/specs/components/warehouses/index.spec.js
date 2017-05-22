import Constants from 'src/constants';
import Warehouse from 'components/warehouses/index';

describe('Warehouse Index - Component', () => {
  it('should have a name', () => {
    expect(Warehouse.name).to.equal('warehouse');
  });

  it('should default data', () => {
    const data = Warehouse.data();

    expect(data.searchAction).to.equal(Constants.SEARCH_WAREHOUSES);
    expect(data.listAction).to.equal(Constants.GET_WAREHOUSES);
    expect(data.clearAction).to.equal(Constants.CLEAR_WAREHOUSE_SEARCH);
  });
});
