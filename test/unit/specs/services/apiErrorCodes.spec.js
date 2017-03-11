import getErrorCodeHandler from 'services/apiErrorCodes';
import Constants from 'src/constants';

describe('apiErrorCodes', () => {
  it('should not throw on 200 responses', () => {
    const dispatch = sinon.spy();
    const response = {
      ok: true,
      status: 200,
    };

    expect(getErrorCodeHandler({
      dispatch,
      response,
    })).to.not.throw();

    expect(dispatch.called).to.not.be.ok;
    expect(dispatch.neverCalledWith(Constants.LOGOUT)).to.be.ok;
  });

  it('should not throw on 204 responses', () => {
    const dispatch = sinon.spy();
    const response = {
      ok: true,
      status: 204,
    };

    expect(getErrorCodeHandler({
      dispatch,
      response,
    })).to.not.throw();

    expect(dispatch.called).to.not.be.ok;
    expect(dispatch.neverCalledWith(Constants.LOGOUT)).to.be.ok;
  });

  it('should throw redirect errors', () => {
    const dispatch = sinon.spy();
    const response = {
      ok: true,
      status: 302,
    };

    expect(getErrorCodeHandler({
      dispatch,
      response,
    })).to.throw();
  });

  it('should throw validation errors', () => {
    const dispatch = sinon.spy();
    const response = {
      ok: true,
      status: 400,
    };

    expect(getErrorCodeHandler({
      dispatch,
      response,
    })).to.throw();
  });

  it('should throw authorization errors', () => {
    const dispatch = sinon.spy();
    const response = {
      ok: true,
      status: 401,
    };

    expect(getErrorCodeHandler({
      dispatch,
      response,
    })).to.throw();

    expect(dispatch.calledWithExactly(Constants.LOGOUT)).to.be.ok;
  });

  it('should throw permission errors', () => {
    const dispatch = sinon.spy();
    const response = {
      ok: true,
      status: 403,
    };

    expect(getErrorCodeHandler({
      dispatch,
      response,
    })).to.throw();
  });

  it('should throw implementation errors', () => {
    const dispatch = sinon.spy();
    const response = {
      ok: false,
      status: 405,
    };

    expect(getErrorCodeHandler({
      dispatch,
      response,
    })).to.throw();
  });

  it('should throw server errors', () => {
    const dispatch = sinon.spy();
    const response = {
      ok: false,
      status: 500,
    };

    expect(getErrorCodeHandler({
      dispatch,
      response,
    })).to.throw();
  });
});
