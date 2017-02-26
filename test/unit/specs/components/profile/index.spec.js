import Constants from 'src/constants';
import Profile from 'components/profile/index';

describe('Profile Index - Component', () => {
  it('should have a name', () => {
    expect(Profile.name).to.equal('profileView');
  });

  it('should retrieve the profile information', () => {
    const spy = Profile.$store = {
      dispatch: sinon.spy(),
    };

    Profile.mounted.apply(Profile);

    sinon.assert.calledOnce(spy.dispatch);
    spy.dispatch.calledWith(Constants.GET_PROFILE);
  });

  describe('computed', () => {
    it('should return user data', () => {
      const store = Profile.$store = {
        state: {
          session: true,
        },
      };
      const result = Profile.computed.user.apply(Profile);

      expect(result).to.equal(store.state.session);
    });
  });
});
