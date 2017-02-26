import Constants from 'src/constants';
import Products from 'components/products/index';

describe('Product Index - Component', () => {
  it('should have a name', () => {
    expect(Products.name).to.equal('productIndex');
  });

  it('should default data', () => {
    const data = Products.data();

    expect(data.searchAction).to.equal(Constants.SEARCH_PRODUCTS);
    expect(data.listAction).to.equal(Constants.GET_PRODUCTS);
    expect(data.clearAction).to.equal(Constants.CLEAR_PRODUCT_SEARCH);
  });
});
