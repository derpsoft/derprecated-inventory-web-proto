import List from 'components/categories/list';

describe('List Categories', () => {
  describe('computed', () => {
    describe('categories', () => {
      let store;
      let category;

      beforeEach(() => {
        category = { id: 1, name: 'JLC' };
        store = List.$store = {
          getters: {
            categorySearch: [],
            categories: [],
          },
        };
        store.getters.categories.push(category);
      });
      it('should return the list if there are are no search results', () => {
        const result = List.computed.categories.apply(List);

        expect(result[0]).to.deep.equal(category);
      });

      it('should return the list if there are are no search results', () => {
        const categorySearch = { id: 2, name: 'BAUS' };
        store.getters.categorySearch.push(categorySearch);
        const result = List.computed.categories.apply(List);

        expect(result[0]).to.not.deep.equal(category);
        expect(result[0]).to.deep.equal(categorySearch);
      });
    });
  });
});
