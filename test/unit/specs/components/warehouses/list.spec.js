import List from 'components/warehouses/list';

describe('List Warehouses', () => {
  describe('computed', () => {
    describe('warehouses', () => {
      let store;
      let warehouse;

      beforeEach(() => {
        warehouse = { id: 1, name: 'JLC' };
        store = List.$store = {
          getters: {
            warehouseSearch: [],
            warehouses: [],
          },
        };
        store.getters.warehouses.push(warehouse);
      });
      it('should return the list if there are are no search results', () => {
        const result = List.computed.warehouses.apply(List);

        expect(result[0]).to.deep.equal(warehouse);
      });

      it('should return the list if there are are no search results', () => {
        const warehouseSearch = { id: 2, name: 'BAUS' };
        store.getters.warehouseSearch.push(warehouseSearch);
        const result = List.computed.warehouses.apply(List);

        expect(result[0]).to.not.deep.equal(warehouse);
        expect(result[0]).to.deep.equal(warehouseSearch);
      });
    });
  });

  describe('methods', () => {
    it('should edit', () => {
      const id = 1;
      const route = `/warehouses/edit/${id}`;
      List.$router = [];

      List.methods.edit.apply(List, [id]);

      expect(List.$router).to.have.a.lengthOf(1);
      expect(List.$router[0]).to.equal(route);
    });
  });
});
