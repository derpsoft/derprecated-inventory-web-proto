import Constants from 'src/constants';
import Form from 'components/registration/form';

describe('Registration Form', () => {
  it('should have data', () => {
    const data = Form.data();

    expect(data.registration.username).to.equal(null);
    expect(data.registration.password).to.equal(null);
    expect(data.registration.repeatPassword).to.equal(null);
    expect(data.registration.firstName).to.equal(null);
    expect(data.registration.lastName).to.equal(null);
    expect(data.registration.email).to.equal(null);
  });

  describe('methods', () => {
    describe('validate', () => {
      // TODO: fix when figured out how to do promises
    });

    it('should register', () => {
      const registration = Form.registration = {
        username: 'Derp',
        password: 'derpy123',
        email: 'derp@derp.com',
        firstName: 'derp',
        lastName: 'derpy',
      };
      const spy = Form.$store = {
        dispatch: sinon.spy(),
      };
      spy.dispatch.withArgs(Constants.REGISTER, registration);

      Form.methods.register.apply(Form);

      expect(spy.dispatch).to.have.been.calledWith(Constants.REGISTER, registration);
    });
  });
});
