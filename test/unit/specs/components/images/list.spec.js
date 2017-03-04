import List from 'components/images/list';

describe('List Images', () => {
  describe('computed', () => {
    describe('images', () => {
      let store;
      let image;

      beforeEach(() => {
        image = { id: 1, name: 'JLC' };
        store = List.$store = {
          getters: {
            imageSearch: [],
            images: [],
          },
        };
        store.getters.images.push(image);
      });
      it('should return the list if there are are no search results', () => {
        const result = List.computed.images.apply(List);

        expect(result[0]).to.deep.equal(image);
      });

      it('should return the list if there are are no search results', () => {
        const imageSearch = { id: 2, name: 'BAUS' };
        store.getters.imageSearch.push(imageSearch);
        const result = List.computed.images.apply(List);

        expect(result[0]).to.not.deep.equal(image);
        expect(result[0]).to.deep.equal(imageSearch);
      });
    });
  });

  describe('methods', () => {
    it('should edit', () => {
      const id = 1;
      const route = `/images/edit/${id}`;
      List.$router = [];

      List.methods.edit.apply(List, [id]);

      expect(List.$router).to.have.a.lengthOf(1);
      expect(List.$router[0]).to.equal(route);
    });
  });

  describe('filters', () => {
    it('should convert to ssl', () => {
      const http = 'http';
      const src = `${http}://baus.com`;

      const result = List.filters.toSsl.apply(List, [src]);

      expect(result).to.equal(`${http}s://baus.com`);
    });
  });
});
