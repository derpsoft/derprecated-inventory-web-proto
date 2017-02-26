import Constants from 'src/constants';
import Vendors from 'components/vendors/index';

describe('Vendors Index - Component', () => {
  it('should have a name', () => {
    expect(Vendors.name).to.equal('vendors');
  });

  it('should default data', () => {
    const data = Vendors.data();

    expect(data.searchAction).to.equal(Constants.SEARCH_VENDORS);
    expect(data.listAction).to.equal(Constants.GET_VENDORS);
    expect(data.clearAction).to.equal(Constants.CLEAR_VENDOR_SEARCH);
  });
});
