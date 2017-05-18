import Constants from 'src/constants';
import Categories from 'components/categories/index';

describe('Location Index - Component', () => {
  it('should have a name', () => {
    expect(Categories.name).to.equal('categories');
  });

  it('should default data', () => {
    const data = Categories.data();

    expect(data.searchAction).to.equal(Constants.SEARCH_CATEGORIES);
    expect(data.listAction).to.equal(Constants.GET_CATEGORIES);
    expect(data.clearAction).to.equal(Constants.CLEAR_CATEGORY_SEARCH);
  });
});
