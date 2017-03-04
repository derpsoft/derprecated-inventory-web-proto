import Constants from 'src/constants';
import Reset from 'components/password/reset';

describe('Reset Component', () => {
  it('should default data', () => {
    const data = Reset.data();

    expect(data.password).to.be.empty;
    expect(data.passwordRepeat).to.be.empty;
  });

  describe('computed', () => {
    it('should return email', () => {
      const email = Reset.$route = {
        params: {
          email: 'derp@derprecated.com',
        },
      };

      const result = Reset.computed.email.apply(Reset);

      expect(result).to.equal(email.params.email);
    });

    it('should return token', () => {
      const token = Reset.$route = {
        params: {
          token: '123',
        },
      };

      const result = Reset.computed.token.apply(Reset);

      expect(result).to.equal(token.params.token);
    });
  });

  describe('methods', () => {
    it('should redirect', () => {
      const router = Reset.$router = [];
      const route = {
        path: '/login',
      };

      Reset.methods.redirect.apply(Reset);

      expect(router).to.have.a.lengthOf(1);
      expect(router[0]).to.deep.equal(route);
    });

    it('should reset password', () => {
      const redirect = Reset.redirect = '/login';
      const email = Reset.email = 'derp@derprecated.com';
      const password = Reset.password = 'password';
      const repeatPassword = Reset.repeatPassword = 'password';
      const token = Reset.token = 'token';

      const resetObj = {
        email,
        password,
        repeatPassword,
        token,
        redirect,
      };

      const spy = Reset.$store = {
        dispatch: sinon.spy(),
      };

      Reset.methods.resetPassword.apply(Reset);

      sinon.assert.calledOnce(spy.dispatch);
      spy.dispatch.withArgs(Constants.RESET_PASSWORD, resetObj);
    });
  });
});
