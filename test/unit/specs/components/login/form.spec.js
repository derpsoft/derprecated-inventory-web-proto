import Constants from 'src/constants';
import Form from 'components/login/form';

describe('Login Form', () => {
  it('should have a name', () => {
    expect(Form.name).to.equal('loginForm');
  });

  it('should mount', () => {
    Form.refresh = () => {};
    const spy = sinon.spy(Form, 'refresh');

    Form.mounted.apply(Form);

    expect(spy).to.have.been.called;
  });

  describe('computed', () => {
    it('should return if authenticated', () => {
      Form.$store = {
        getters: {
          isAuthenticated: true,
        },
      };

      const isAuthenticated = Form.computed.isAuthenticated.apply(Form);

      expect(isAuthenticated).to.be.ok;
    });
  });

  describe('methods', () => {
    describe('refresh', () => {
      let routerSpy;
      let dispatchSpy;
      const routerArgs = '/';

      beforeEach(() => {
        routerSpy = Form.$router = {
          go: sinon.spy(),
        };

        dispatchSpy = Form.$store = {
          dispatch: sinon.spy(),
        };

        dispatchSpy.dispatch.withArgs(Constants.LOGIN);
        routerSpy.go.withArgs(routerArgs);
      });

      it('should redirect to login if not authenticated', () => {
        Form.isAuthenticated = false;
        Form.methods.refresh.apply(Form);

        expect(dispatchSpy.dispatch).to.have.been.calledWith(Constants.LOGIN);
        expect(routerSpy.go).to.have.not.been.called;
      });

      it('should redirect to dashboard if logged in', () => {
        Form.isAuthenticated = true;
        Form.methods.refresh.apply(Form);

        expect(dispatchSpy.dispatch).to.have.not.been.called;
        expect(routerSpy.go).to.have.been.calledWith(routerArgs);
      });
    });
  });
});
