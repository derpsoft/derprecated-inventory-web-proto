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

  });
});
