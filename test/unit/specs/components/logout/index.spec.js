import Constants from 'src/constants';
import Logout from 'components/logout/index';

describe('Logout - Index', () => {
  it('should have a name', () => {
    expect(Logout.name).to.equal('logout');
  });

  it('should log out', () => {
    const store = Logout.$store = {
      dispatch() {},
    };

    const spy = sinon.spy(store, 'dispatch');
    spy.withArgs(Constants.LOGOUT);

    Logout.created.apply(Logout);

    spy.calledWith(Constants.LOGOUT);
    sinon.assert.calledOnce(spy);
  });
});
