import getErrorCodeHandler from 'services/apiErrorCodes';
import Constants from 'src/constants';

describe('apiErrorCodes', () => {
  it('should not throw on 200 responses', () => {
    const dispatch = sinon.spy();
    const response = {
      ok: true,
      statusCode: 200,
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
      statusCode: 204,
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
      statusCode: 302,
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
      statusCode: 400,
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
      statusCode: 401,
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
      statusCode: 403,
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
      statusCode: 405,
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
      statusCode: 500,
    };

    expect(getErrorCodeHandler({
      dispatch,
      response,
    })).to.throw();
  });
});
