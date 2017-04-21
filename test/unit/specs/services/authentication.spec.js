// import Auth0Lock from 'auth0-lock';
// import config from 'root/config';
import Auth from 'services/authentication';

describe('Authentication Service', () => {
  describe('constructor', () => {
    let auth;
    // let stub;

    beforeEach(() => {
      const html = '<div id="fixture"><div id="login-container"></div></div>';

      fixture.set(html);
      // stub = sinon.stub(Auth.prototype, 'constructor');
      auth = new Auth();
    });

    it('should initialize ', () => {
      expect(auth.lock).to.be.ok;
      // expect(Auth.prototype.constructor).to.have.been.called;
    });
  });

  describe('methods', () => {
    let auth;

    beforeEach(() => {
      auth = new Auth();
    });

    afterEach(() => {
      auth = null;
    });

    // TODO: need to figure out how this promise fires
    // http://stackoverflow.com/questions/25342129/how-to-test-es6-promises-with-jasmine-2-0
    // http://ricostacruz.com/cheatsheets/sinon.html
    describe('User Info', () => {
      it('should get user info when accepted', () => {
        const tokens = {
          accessToken: 1234,
          idToken: 1,
        };
        const error = null;
        const profile = {
          nickname: 'nick',
          name: 'nicker',
        };
        // const result = {
        //   ...profile,
        //   userName: profile.nickname,
        //   displayName: profile.name,
        //   permissions: '',
        //   accessToken: tokens.accessToken,
        //   idToken: tokens.idToken,
        // };

        const stub = sinon.stub(auth.lock, 'getUserInfo').returns(error, profile);
        const info = auth.getUserInfo(tokens);

        stub.withArgs(tokens.accessToken);

        expect(info).to.be.a('Promise');

        return info.then(() => {
          // console.log(profile);
          expect(stub).to.have.been.called;
        })
        .catch(() => {}).should.be.resolved;
      });

      it('should get user info when rejected', () => {
        const tokens = {
          accessToken: 1234,
          idToken: 1,
        };
        const error = {
          message: 'error',
        };
        const profile = {};
        const stub = sinon.stub(auth.lock, 'getUserInfo').returns(error, profile);
        const info = auth.getUserInfo(tokens);

        stub.withArgs(tokens.accessToken);

        expect(info).to.be.a('Promise');

        return info.then(() => {})
        .catch((err) => {
          expect(err.message).to.equal(error.message);
        }).should.be.rejected;
      });
    });

    it('should show error on On Authenticated error', () => {
      sinon.spy(auth.lock, 'on');
      const cb = () => {};
      const eventType = 'authenticated';

      auth.onAuthenticated(cb);

      expect(auth.lock.on).to.have.been.called;
      expect(auth.lock.on).to.have.been.calledWith(eventType);
    });

    it('should show error on On Authorization error', () => {
      sinon.spy(auth.lock, 'on');
      const callback = () => {};
      const eventType = 'authorization_error';

      auth.onAuthorizationError(callback);

      expect(auth.lock.on).to.have.been.called;
      expect(auth.lock.on).to.have.been.calledWith(eventType, callback);
    });

    it('should show error on On Unrecoverable error', () => {
      sinon.spy(auth.lock, 'on');
      const callback = () => {};
      const eventType = 'unrecoverable_error';

      auth.onUnrecoverableError(callback);

      expect(auth.lock.on).to.have.been.called;
      expect(auth.lock.on).to.have.been.calledWith(eventType, callback);
    });

    it('should show the login', () => {
      sinon.spy(auth.lock, 'show');

      auth.show();

      expect(auth.lock.show).to.have.been.called;
    });

    it('should fire a call back after showing the login', () => {
      sinon.spy(auth.lock, 'on');
      const callback = () => {};
      const eventType = 'show';

      auth.onShow(callback);

      expect(auth.lock.on).to.have.been.called;
      expect(auth.lock.on).to.have.been.calledWith(eventType, callback);
    });

    it('should hide the login', () => {
      sinon.spy(auth.lock, 'hide');

      auth.hide();

      expect(auth.lock.hide).to.have.been.called;
    });

    it('should fire the callback after hiding the login', () => {
      sinon.spy(auth.lock, 'on');
      const callback = () => {};
      const eventType = 'hide';

      auth.onHide(callback);

      expect(auth.lock.on).to.have.been.called;
      expect(auth.lock.on).to.have.been.calledWith(eventType, callback);
    });
  });
});
