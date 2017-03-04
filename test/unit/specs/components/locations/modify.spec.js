import Modify from 'components/locations/modify';

describe('Modify Locations', () => {
  it('should return data', () => {
    const data = Modify.data();

    expect(data).to.be.empty;
  });

  describe('computed', () => {
    it('should return if added', () => {
      Modify.$route = {
        path: '/add',
      };
      const isAdd = Modify.computed.isAdd.apply(Modify);

      expect(isAdd).to.be.ok;
    });
  });
});
