import Modify from 'components/inventory/modify';

describe('Modify Inventory', () => {
  it('should return data', () => {
    const data = Modify.data();

    expect(data).to.be.empty;
  });

  describe('computed', () => {
    it('should return status of receive', () => {
      Modify.$route = {
        path: '/receive',
      };
      const isReceive = Modify.computed.isReceive.apply(Modify);

      expect(isReceive).to.be.ok;
    });

    it('should return status of dispatch', () => {
      Modify.$route = {
        path: '/dispatch',
      };
      const isDispatch = Modify.computed.isDispatch.apply(Modify);

      expect(isDispatch).to.be.ok;
    });

    it('should return status of import', () => {
      Modify.$route = {
        path: '/import',
      };
      const isImport = Modify.computed.isImport.apply(Modify);

      expect(isImport).to.be.ok;
    });
  });
});
