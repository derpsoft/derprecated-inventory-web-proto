import Modify from 'components/images/modify';

describe('Modify Images', () => {
  it('should return data', () => {
    const data = Modify.data();

    expect(data).to.be.empty;
  });
});
