// import VueComponent from 'unit/utils';
import Header from 'components/header/index';

describe('Header - Index.vue', () => {
  it('should set the name', () => {
    expect(Header.name).to.equal('header');
  });

  it('should set data', () => {
    const data = Header.data();
    expect(data.appVersion).to.not.be.undefined;
  });

  it('should retrieve the computed user session', () => {
    const session = Header.$store = {
      getters: {
        profile: {},
      },
    };

    const computedSession = Header.computed.user.apply(Header);

    expect(computedSession).to.equal(session.getters.profile);
  });
});
