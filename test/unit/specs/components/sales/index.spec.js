import Constants from 'src/constants';
import Sales from 'components/sales/index';

describe('Sales Index - Component', () => {
  it('should have a name', () => {
    expect(Sales.name).to.equal('sales');
  });

  it('should default data', () => {
    const data = Sales.data();

    expect(data.searchAction).to.equal(Constants.SEARCH_SALES);
    expect(data.listAction).to.equal(Constants.GET_SALES);
    expect(data.clearAction).to.equal(Constants.CLEAR_SALE_SEARCH);
  });
});
