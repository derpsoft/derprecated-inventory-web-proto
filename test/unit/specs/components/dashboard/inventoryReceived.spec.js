import InventoryReceived from 'components/dashboard/inventoryReceived';

describe('Inventory Received Widget', () => {
  it('should return data', () => {
    const data = InventoryReceived.data();
    expect(data.title).to.equal('Inventory Received');
    expect(data.groupBy).to.equal('Month');
  });

  describe('computed', () => {
    it('should return report', () => {
      const store = InventoryReceived.$store = {
        getters: {
          dashboard: 1,
        },
      };
      const result = InventoryReceived.computed.report.apply(InventoryReceived);
      expect(result).to.equal(store.getters.dashboard);
    });
  });
});
