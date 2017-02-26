import moment from 'moment';
import Today from 'components/shared/today';

describe('Today - component', () => {
  it('should have a name', () => {
    expect(Today.name).to.equal('today');
  });

  it('should default date moment to component data', () => {
    const data = Today.data();

    expect(data.date.format('MM/DD/YYYY')).to.equal(moment().format('MM/DD/YYYY'));
  });

  it('should format dates', () => {
    const date = moment('9/30/2017');
    const result = Today.filters.formatDate.apply(Today, [date]);

    expect(result).to.equal('September 30, 2017');
  });
});
