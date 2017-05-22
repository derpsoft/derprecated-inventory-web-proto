import List from 'components/users/list';

describe('List Users', () => {
  describe('computed', () => {
    describe('users', () => {
      let store;
      let user;

      beforeEach(() => {
        user = { id: 1, name: 'JLC' };
        store = List.$store = {
          getters: {
            userSearch: [],
            users: [],
          },
        };
        store.getters.users.push(user);
      });
      it('should return the list if there are are no search results', () => {
        const result = List.computed.users.apply(List);

        expect(result[0]).to.deep.equal(user);
      });

      it('should return the list if there are are no search results', () => {
        const userSearch = { id: 2, name: 'BAUS' };
        store.getters.userSearch.push(userSearch);
        const result = List.computed.users.apply(List);

        expect(result[0]).to.not.deep.equal(user);
        expect(result[0]).to.deep.equal(userSearch);
      });
    });
  });
});
