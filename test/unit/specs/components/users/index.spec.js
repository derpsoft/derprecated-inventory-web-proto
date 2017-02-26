import Constants from 'src/constants';
import Users from 'components/users/index';

describe('Users Index - Component', () => {
  it('should have a name', () => {
    expect(Users.name).to.equal('users');
  });

  it('should default data', () => {
    const data = Users.data();

    expect(data.searchAction).to.equal(Constants.SEARCH_USERS);
    expect(data.listAction).to.equal(Constants.GET_USERS);
    expect(data.clearAction).to.equal(Constants.CLEAR_USER_SEARCH);
  });
});
