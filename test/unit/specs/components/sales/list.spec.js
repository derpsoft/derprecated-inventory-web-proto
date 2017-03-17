import {
  intl as Intl,
} from 'utils';
import List from 'components/sales/list';

describe('List Sales', () => {
  describe('computed', () => {
    describe('sales', () => {
      let store;
      let sales;

      beforeEach(() => {
        sales = { id: 1, name: 'Cat Tree' };
        store = List.$store = {
          getters: {
            saleSearch: [],
            sales: [],
          },
        };
        store.getters.sales.push(sales);
      });
      it('should return the list if there are are no search results', () => {
        const result = List.computed.sales.apply(List);

        expect(result[0]).to.deep.equal(sales);
      });

      it('should return the list if there are are no search results', () => {
        const saleSearch = { id: 2, name: 'LED' };
        store.getters.saleSearch.push(saleSearch);
        const result = List.computed.sales.apply(List);

        expect(result[0]).to.not.deep.equal(sales);
        expect(result[0]).to.deep.equal(saleSearch);
      });
    });
  });

  describe('filters', () => {
    let intlSpy;

    beforeEach(() => {
      window.Intl = Intl;
      intlSpy = sinon.spy(Intl, 'NumberFormat');
    });
    afterEach(() => {
      window.Intl = null;
      intlSpy.restore();
    });

    it('should format timestamp', () => {
      const date = new Date(2017, 2, 11, 20, 30);
      const result = List.filters.formatTimestamp.apply(List, [date]);
      expect(result).to.equal('Mar 11, 2017 8:30 PM');
    });

    it('should format currency', () => {
      const value = 10.00;
      const currency = 'en-US';
      const format = {
        style: 'currency',
        currencyDisplay: 'symbol',
        currency: 'USD',
      };
      intlSpy.withArgs(currency, format);
      List.filters.formatCurrency.apply(List, [value]);
      expect(intlSpy).to.have.been.calledWith(currency, format);
    });
  });
});
