// import Constants from 'src/constants';
import Add from 'components/locations/add';

describe('Add Location', () => {
  it('should default data', () => {
    const data = Add.data();

    expect(data.location).to.be.empty;
  });

  describe('methods', () => {
    it('should set location', () => {
      const path = '/sales';
      Add.methods.setLocation.apply(Add, [path]);

      expect(Add.location).to.equal(path);
    });

    it('should validate', () => {
      const spy = Add.$refs = {
        locationForm: {
          validate: sinon.spy(),
        },
      };

      Add.methods.validate.apply(Add);

      expect(spy.locationForm.validate).to.have.been.called;
    });
  });
});
