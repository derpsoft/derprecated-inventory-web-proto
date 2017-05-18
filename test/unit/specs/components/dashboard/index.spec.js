import Constants from 'src/constants';
import Dashboard from 'components/dashboard/index';

describe('Dashboard Index', () => {
  it('should have a name', () => {
    expect(Dashboard.name).to.equal('dashboard');
  });

  it('should mount', () => {
    const month = Dashboard.groupBy = 'month';
    const store = Dashboard.$store = {
      dispatch: sinon.spy(),
    };
    const group = {
      groupBy: month,
    };

    store.dispatch.withArgs(Constants.GET_DASHBOARD, group);

    Dashboard.mounted();

    expect(store.dispatch).to.have.been.calledWith(Constants.GET_DASHBOARD, group);
  });
});
