import Fetchable from 'services/fetchable';
import fetchMock from 'fetch-mock';

describe('Fetchable', () => {
  it('throws if baseUrl is empty', () => {
    expect(() => new Fetchable('', {})).to.throw();
  });

  it('throws if store is empty', () => {
    expect(() => new Fetchable('http://')).to.throw();
  });

  it('rejects on authentication failed', () => {
    const host = 'http://0.0.0.0';
    const fetch = fetchMock.sandbox().mock(`begin:${host}`, 401);
    const dispatch = sinon.spy();
    const fetchable = new Fetchable(host, {
      dispatch,
      getters: {
        tokens: {},
      },
    }, fetch);

    return expect(fetchable.get('/')).to.be.rejected;
  });

  describe('#get()', () => {
    it('should exist', () => {
      const fetchable = new Fetchable('http://0.0.0.0', {}, () => {});

      expect(fetchable.get).to.be.a('function');
    });

    it('throws on empty path', () => {
      const fetchable = new Fetchable('http://0.0.0.0', {}, () => {});

      expect(() => fetchable.get()).to.throw();
      expect(() => fetchable.get('')).to.throw();
    });

    it('should handle requests', () => {
      const host = 'http://0.0.0.0';
      const fetch = fetchMock.sandbox().mock(`begin:${host}`, 200);
      const dispatch = sinon.spy();
      const fetchable = new Fetchable(host, {
        dispatch,
        getters: {
          tokens: {},
        },
      }, fetch);

      return expect(fetchable.get('/')).to.be.fulfilled;
    });
  });

  describe('#post()', () => {
    it('should exist', () => {
      const fetchable = new Fetchable('http://0.0.0.0', {}, () => {});

      expect(fetchable.post).to.be.a('function');
    });

    it('should handle requests', () => {
      const host = 'http://0.0.0.0';
      const fetch = fetchMock.sandbox().mock(`begin:${host}`, 200);
      const dispatch = sinon.spy();
      const fetchable = new Fetchable(host, {
        dispatch,
        getters: {
          tokens: {},
        },
      }, fetch);

      return expect(fetchable.post('/')).to.be.fulfilled;
    });
  });
});
