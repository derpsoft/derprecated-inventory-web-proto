import List from 'components/locations/list';

describe('List Locations', () => {
  describe('computed', () => {
    describe('locations', () => {
      let store;
      let location;

      beforeEach(() => {
        location = { id: 1, name: 'JLC' };
        store = List.$store = {
          getters: {
            locationSearch: [],
            locations: [],
          },
        };
        store.getters.locations.push(location);
      });
      it('should return the list if there are are no search results', () => {
        const result = List.computed.locations.apply(List);

        expect(result[0]).to.deep.equal(location);
      });

      it('should return the list if there are are no search results', () => {
        const locationSearch = { id: 2, name: 'BAUS' };
        store.getters.locationSearch.push(locationSearch);
        const result = List.computed.locations.apply(List);

        expect(result[0]).to.not.deep.equal(location);
        expect(result[0]).to.deep.equal(locationSearch);
      });
    });
  });

  describe('methods', () => {
    it('should edit', () => {
      const id = 1;
      const route = `/locations/edit/${id}`;
      List.$router = [];

      List.methods.edit.apply(List, [id]);

      expect(List.$router).to.have.a.lengthOf(1);
      expect(List.$router[0]).to.equal(route);
    });
  });
});
