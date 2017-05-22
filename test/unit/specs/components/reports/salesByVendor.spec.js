import Report from 'components/reports/salesByVendor';

describe('Sales by Vendor Report', () => {
  let report;
  let renderSpy;

  beforeEach(() => {
    report = new Report();
    renderSpy = sinon.spy(report, 'render');
    report.$mount();
  });

  it('render on mount', () => {
    expect(renderSpy).to.have.been.called;
  });

  it('should watch data and re-render', () => {
    report.data = [1];

    report.$nextTick(() => {
      expect(renderSpy).to.have.been.called;
    });
  });

  describe('methods', () => {
    it('should render', () => {
      const spy = sinon.spy(report, 'renderChart');
      report.render();
      expect(spy).to.have.been.called;
    });
  });
});
