import List from 'components/products/list';

describe('List Images', () => {
  describe('computed', () => {
    let store;

    beforeEach(() => {
      store = List.$store = {
        getters: {
          productSearch: [],
          products: [],
        },
      };
    });

    describe('searchResults', () => {
      it('should return a list', () => {
        const LED = {
          id: 1,
          name: 'LED',
        };
        store.getters.productSearch.push(LED);

        const result = List.computed.searchResults.apply(List);
        expect(result).to.have.a.lengthOf(1);
        expect(result[0]).to.deep.equal(LED);
      });
    });

    describe('list', () => {
      it('should return a list', () => {
        const catTree = {
          id: 1,
          name: 'Cat Tree',
        };
        store.getters.products.push(catTree);

        const result = List.computed.list.apply(List);
        expect(result).to.have.a.lengthOf(1);
        expect(result[0]).to.deep.equal(catTree);
      });
    });

    describe('products', () => {
      let catTree;

      beforeEach(() => {
        catTree = {
          id: 1,
          name: 'Cat Tree',
        };
        List.list = [];
        List.searchResults = [];
        List.list.push(catTree);
      });
      it('should return the list if there are are no search results', () => {
        const result = List.computed.products.apply(List);
        expect(result[0]).to.deep.equal(catTree);
      });

      it('should return the list if there are are no search results', () => {
        const searchResult = {
          id: 2,
          name: 'LED',
        };

        List.searchResults.push(searchResult);
        const result = List.computed.products.apply(List);

        expect(result[0]).to.not.deep.equal(catTree);
        expect(result[0]).to.deep.equal(searchResult);
      });
    });
  });

  describe('methods', () => {
    it('should edit', () => {
      const id = 1;
      const route = `/products/edit/${id}`;
      List.$router = [];

      List.methods.edit.apply(List, [id]);

      expect(List.$router).to.have.a.lengthOf(1);
      expect(List.$router[0]).to.equal(route);
    });
  });
});
