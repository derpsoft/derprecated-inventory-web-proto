import {
  Bar,
} from 'chartist';
import {
  VueComponent,
} from 'testUtils';
import Chart from 'shared/chart';

describe('Chart - Shared Component', () => {
  it('should mount and draw the chart', () => {
    Chart.draw = () => {};
    const spy = sinon.spy(Chart, 'draw');

    Chart.mounted.apply(Chart);

    sinon.assert.calledOnce(spy);
    sinon.assert.called(spy);
  });

  describe('props', () => {
    let props;

    beforeEach(() => {
      props = Chart.props;
    });

    it('should have labels', () => {
      expect(props.labels).to.be.defined;
      expect(props.labels.type).to.equal(Array);
      expect(props.labels.required).to.be.ok;
    });

    it('should have series', () => {
      expect(props.series).to.be.defined;
      expect(props.series.type).to.equal(Array);
      expect(props.series.required).to.be.ok;
    });

    it('should have options', () => {
      const defaultOpts = {
        fullWidth: true,
        chartPadding: {
          right: 40,
        },
        height: '500px',
      };
      expect(props.options).to.be.defined;
      expect(props.options.type).to.equal(Object);
      expect(props.options.required).to.be.not.ok;
      expect(props.options.default).to.deep.equal(defaultOpts);
    });
  });

  it('should draw the chart', () => {
    Chart.$el = '<div></div>';
    const propsData = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      series: [
        [12, 9, 7, 8, 5],
        [2, 1, 3.5, 7, 3],
        [1, 3, 4, 5, 6],
      ],
      options: {},
    };
    let ctor = VueComponent(Chart, propsData);
    const result = ctor.draw();
    expect(result).to.an.instanceof(Bar);
    ctor = null;
  });
});
