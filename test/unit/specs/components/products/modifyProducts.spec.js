import Modify from 'components/products/modifyProduct';

describe('Modify Inventory', () => {
  it('should have a name', () => {
    expect(Modify.name).to.equal('modifyProductView');
  });

  describe('computed', () => {
    it('should return status of add', () => {
      Modify.$route = {
        path: '/add',
      };
      const isAdded = Modify.computed.isAdd.apply(Modify);

      expect(isAdded).to.be.ok;
    });

    it('should return status of edit', () => {
      Modify.$route = {
        path: '/edit',
      };
      const isEdit = Modify.computed.isEdit.apply(Modify);

      expect(isEdit).to.be.ok;
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
