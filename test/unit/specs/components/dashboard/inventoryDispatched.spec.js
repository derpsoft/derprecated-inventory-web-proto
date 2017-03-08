import InventoryDispatched from 'components/dashboard/inventoryDispatched';

describe('Inventory Dispatched Widget', () => {
  it('should return data', () => {
    const data = InventoryDispatched.data();
    expect(data.title).to.equal('Inventory Dispatched');
    expect(data.groupBy).to.equal('Month');
  });

  describe('computed', () => {
    it('should return report', () => {
      const store = InventoryDispatched.$store = {
        getters: {
          dashboard: 1,
        },
      };
      const result = InventoryDispatched.computed.report.apply(InventoryDispatched);
      expect(result).to.equal(store.getters.dashboard);
    });
  });
});
