import Fetchable from 'services/fetchable';

describe('Fetchable', () => {
  it('throws if baseUrl is empty', () => {
    expect(() => new Fetchable('', {})).to.throw();
  });

  it('throws if store is empty', () => {
    expect(() => new Fetchable('http://')).to.throw();
  });

  it('throws error on authentication failed', () => {
    const fetch = sinon
      .stub()
      .resolves({
        status: 401,
      });

    const fetchable = new Fetchable('http://0.0.0.0', {}, fetch);

    expect(() => fetchable.get('/')).to.throw();
    expect(fetch.calledWith('http://0.0.0.0/')).to.be.ok;
  });

  describe('#get()', () => {
    it('should exist', () => {
      const fetchable = new Fetchable('http://0.0.0.0', {}, () => {});

      expect(fetchable.get).to.be.a('function');
    });

    it('should throw on empty path', () => {
      const fetchable = new Fetchable('http://0.0.0.0', {}, () => {});

      expect(() => fetchable.get()).to.throw();
      expect(() => fetchable.get('')).to.throw();
    });

    it('should handle requests', () => {
      const fetch = sinon
        .stub()
        .returns(new Promise((resolve) => {
          resolve({
            status: 200,
          });
        }));

      const fetchable = new Fetchable('http://0.0.0.0', {}, fetch);

      expect(() => fetchable.get('/')).to.not.throw();
      expect(fetch.calledWith('http://0.0.0.0/')).to.be.ok;
    });
  });

  describe('#post()', () => {
    it('should exist', () => {
      const fetchable = new Fetchable('http://0.0.0.0', {}, () => {});

      expect(fetchable.post).to.be.a('function');
    });

    it('should handle requests', () => {
      const fetch = sinon
        .stub()
        .returns(new Promise((resolve) => {
          resolve({
            status: 200,
          });
        }));

      const fetchable = new Fetchable('http://0.0.0.0', {}, fetch);

      expect(() => fetchable.post('/')).to.not.throw();
      expect(fetch.calledWith('http://0.0.0.0/')).to.be.ok;
    });
  });
});
