import Constants from 'src/constants';
import Forgot from 'components/password/forgot';

describe('Forgot Password', () => {
  it('should default data', () => {
    const data = Forgot.data();

    expect(data.email).to.be.a('null');
    expect(data.emailError).to.be.not.ok;
  });

  describe('computed', () => {
    it('should let the user know the reset was successful', () => {
      const store = Forgot.$store = {
        getters: {
          isResetPasswordSuccess: true,
        },
      };

      const result = Forgot.computed.resetRequested.apply(Forgot);

      expect(result).to.equal(store.getters.isResetPasswordSuccess);
    });
  });

  describe('methods', () => {
    // describe('validate', () => {
    //   let promise;
    //
    //   beforeEach(() => {
    //     promise = Forgot.$validator = {
    //       validateAll: sinon.stub(),
    //     };
    //   });
    //
    //   it('should validate the the form before submitting', () => {
    //     Forgot.retrievePassword = () => {};
    //     const spy = sinon.spy(Forgot, 'retrievePassword');
    //     const result = true;
    //
    //     promise.validateAll.resolves(result).then(() => {
    //       sinon.assert.called(spy);
    //     });
    //   });
    // });

    describe('retrieve password', () => {
      let spy;

      beforeEach(() => {
        spy = Forgot.$store = {
          dispatch: sinon.spy(),
        };
      });

      it('should not allow a password reset without an email', () => {
        Forgot.email = null;
        Forgot.emailError = false;

        Forgot.methods.retrievePassword.apply(Forgot);

        expect(Forgot.emailError).to.be.ok;
        sinon.assert.notCalled(spy.dispatch);
      });

      it('should allow password reset', () => {
        const email = Forgot.email = 'derp@derp.com';
        Forgot.emailError = false;

        Forgot.methods.retrievePassword.apply(Forgot);

        expect(Forgot.emailError).to.not.be.ok;
        sinon.assert.calledOnce(spy.dispatch);
        spy.dispatch.calledWith(Constants.FORGOT_PASSWORD, { email });
      });
    });
  });

  it('should mount and set dispatch', () => {
    const spy = Forgot.$store = {
      dispatch: sinon.spy(),
    };

    Forgot.mounted.apply(Forgot);

    spy.dispatch.calledWith(Constants.RESET_RESET_PASSWORD_FLAG, false);
  });
});
