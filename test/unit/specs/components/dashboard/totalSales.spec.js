import {
  intl as Intl,
} from 'utils';
import TotalSales from 'components/dashboard/totalSales';

describe('Total Sales Widget', () => {
  describe('computed', () => {
    it('should return report', () => {
      const store = TotalSales.$store = {
        getters: {
          dashboard: 1,
        },
      };
      const result = TotalSales.computed.report.apply(TotalSales);
      expect(result).to.equal(store.getters.dashboard);
    });
  });

  describe('methods', () => {
    let intlSpy;

    beforeEach(() => {
      window.Intl = Intl;
      intlSpy = sinon.spy(Intl, 'NumberFormat');
    });
    afterEach(() => {
      window.Intl = null;
      intlSpy.restore();
    });

    it('should format money', () => {
      window.Intl = Intl;
      const value = 10.00;
      const currency = 'en-US';
      const format = {
        style: 'currency',
        currencyDisplay: 'symbol',
        currency: 'USD',
      };
      intlSpy.withArgs(currency, format);
      TotalSales.methods.formatMoney.apply(TotalSales, [value]);
      expect(intlSpy).to.have.been.calledWith(currency, format);
    });
  });
});
