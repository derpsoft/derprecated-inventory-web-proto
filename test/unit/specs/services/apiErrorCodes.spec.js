import getErrorCodeHandler from 'services/apiErrorCodes';
import Constants from 'src/constants';

describe('apiErrorCodes', () => {
  it('should not throw on 200 responses', () => {
    const dispatch = sinon.spy();
    const code = 200;

    expect(getErrorCodeHandler({
      dispatch,
      code,
    })).to.not.throw();

    expect(dispatch.called).to.not.be.ok;
    expect(dispatch.neverCalledWith(Constants.LOGOUT)).to.be.ok;
  });

  it('should not throw on 204 responses', () => {
    const dispatch = sinon.spy();
    const code = 204;

    expect(getErrorCodeHandler({
      dispatch,
      code,
    })).to.not.throw();

    expect(dispatch.called).to.not.be.ok;
    expect(dispatch.neverCalledWith(Constants.LOGOUT)).to.be.ok;
  });

  it('should throw redirect errors', () => {
    const dispatch = sinon.spy();
    const code = 302;

    expect(getErrorCodeHandler({
      dispatch,
      code,
    })).to.throw();
  });

  it('should throw validation errors', () => {
    const dispatch = sinon.spy();
    const code = 400;

    expect(getErrorCodeHandler({
      dispatch,
      code,
    })).to.throw();
  });

  it('should throw authorization errors', () => {
    const dispatch = sinon.spy();
    const code = 401;

    expect(getErrorCodeHandler({
      dispatch,
      code,
    })).to.throw();

    expect(dispatch.calledWithExactly(Constants.LOGOUT)).to.be.ok;
  });

  it('should throw permission errors', () => {
    const dispatch = sinon.spy();
    const code = 403;

    expect(getErrorCodeHandler({
      dispatch,
      code,
    })).to.throw();
  });

  it('should throw implementation errors', () => {
    const dispatch = sinon.spy();
    const code = 405;

    expect(getErrorCodeHandler({
      dispatch,
      code,
    })).to.throw();
  });

  it('should throw server errors', () => {
    const dispatch = sinon.spy();
    const code = 500;

    expect(getErrorCodeHandler({
      dispatch,
      code,
    })).to.throw();
  });
});