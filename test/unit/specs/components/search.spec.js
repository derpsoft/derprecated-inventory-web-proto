import Search from 'components/search';

describe('Search Component', () => {
  it('it should default data', () => {
    const data = Search.data();

    expect(data.searchTerm).to.be.empty;
  });

  describe('computed', () => {
    it('should return params', () => {
      const searchTerm = Search.searchTerm = 'cat';
      const skip = Search.skip = 0;
      const take = Search.take = 20;
      const params = Search.computed.params.apply(Search);

      expect(params.query).to.equal(searchTerm);
      expect(params.skip).to.equal(skip);
      expect(params.take).to.equal(take);
    });

    describe('action', () => {
      let list;
      let search;

      beforeEach(() => {
        search = Search.searchActionName = () => 'action';
        list = Search.listActionName = () => 'list';
      });

      it('should return a search', () => {
        Search.searchTerm = 'term';
        const action = Search.computed.action.apply(Search);

        expect(action).to.equal(search);
      });

      it('should return a list', () => {
        Search.searchTerm = '';
        const action = Search.computed.action.apply(Search);

        expect(action).to.equal(list);
      });
    });

    describe('mount', () => {
      let searchSpy;

      beforeEach(() => {
        Search.search = () => {};
        Search.searchOnMount = false;
        searchSpy = sinon.spy(Search, 'search');
      });

      it('should search on mount', () => {
        Search.searchOnMount = true;

        Search.mounted();

        expect(searchSpy).to.have.been.called;
      });

      it('should search on mount', () => {
        Search.mounted();
        expect(searchSpy).to.not.have.been.called;
      });
    });

    it('should clear before being destroyed', () => {
      Search.clear = () => {};

      const spy = sinon.spy(Search, 'clear');
      Search.beforeDestroy();

      expect(spy).to.have.been.called;
    });
  });

  describe('methods', () => {
    describe('clear', () => {
      let store;

      beforeEach(() => {
        Search.clearActionName = '';
        store = Search.$store = {
          dispatch: sinon.spy(),
        };
      });

      it('it should clear when action is available', () => {
        const clearAction = Search.clearActionName = 'clear';
        Search.methods.clear.apply(Search);
        expect(store.dispatch).to.have.been.calledWith(clearAction);
      });

      it('it should not clear when action is available', () => {
        Search.methods.clear.apply(Search);
        expect(store.dispatch).to.have.not.been.called;
      });
    });

    describe('search', () => {
      let clearSpy;
      let store;
      let params;
      let action;

      beforeEach(() => {
        params = Search.params = {};
        action = Search.action = 'clear';
        Search.listActionName = '';
        Search.clear = () => {};
        clearSpy = sinon.spy(Search, 'clear');
        store = Search.$store = {
          dispatch: sinon.spy(),
        };
        store.dispatch.withArgs(action, params);
      });

      it('should clear before Search', () => {
        Search.listActionName = 'clear';

        Search.methods.search.apply(Search);

        expect(clearSpy).to.have.been.calledOnce;
        expect(store.dispatch).to.have.been.calledWith(action, params);
      });

      it('should clear before Search', () => {
        Search.listActionName = 'cleared';

        Search.methods.search.apply(Search);

        expect(clearSpy).to.have.not.been.called;
        expect(store.dispatch).to.have.been.calledWith(action, params);
      });
    });
  });
});
