import List from 'components/vendors/list';

describe('List Vendors', () => {
  describe('computed', () => {
    describe('vendors', () => {
      let store;
      let vendor;

      beforeEach(() => {
        vendor = { id: 1, name: 'JLC' };
        store = List.$store = {
          getters: {
            vendorSearch: [],
            vendors: [],
          },
        };
        store.getters.vendors.push(vendor);
      });
      it('should return the list if there are are no search results', () => {
        const result = List.computed.vendors.apply(List);

        expect(result[0]).to.deep.equal(vendor);
      });

      it('should return the list if there are are no search results', () => {
        const vendorSearch = { id: 2, name: 'BAUS' };
        store.getters.vendorSearch.push(vendorSearch);
        const result = List.computed.vendors.apply(List);

        expect(result[0]).to.not.deep.equal(vendor);
        expect(result[0]).to.deep.equal(vendorSearch);
      });
    });
  });
});
