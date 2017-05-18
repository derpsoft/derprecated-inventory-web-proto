import Constants from 'src/constants';
import Locations from 'components/locations/index';

describe('Location Index - Component', () => {
  it('should have a name', () => {
    expect(Locations.name).to.equal('location');
  });

  it('should default data', () => {
    const data = Locations.data();

    expect(data.searchAction).to.equal(Constants.SEARCH_LOCATIONS);
    expect(data.listAction).to.equal(Constants.GET_LOCATIONS);
    expect(data.clearAction).to.equal(Constants.CLEAR_LOCATION_SEARCH);
  });
});
