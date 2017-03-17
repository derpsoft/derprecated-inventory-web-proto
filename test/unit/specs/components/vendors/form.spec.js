import Constants from 'src/constants';
import Form from 'components/vendors/form';

describe('Vendor Form', () => {
  it('it should return data', () => {
    const data = Form.data();

    expect(data.value).to.be.empty;
  });

  describe('computed', () => {
    it('should return vendors', () => {
      const id = Form.id = 1;
      const store = Form.$store = {
        getters: {
          vendor: sinon.spy(),
        },
      };

      Form.computed.vendor.apply(Form);

      expect(store.getters.vendor).to.have.been.calledWith(id);
    });
  });

  describe('mounted', () => {
    it('should load', () => {
      Form.load = () => {};
      const spy = sinon.spy(Form, 'load');

      Form.mounted();
      expect(spy).to.have.been.called;
    });
  });

  describe('methods', () => {
    describe('load', () => {
      let id;
      let spy;
      let obj;

      beforeEach(() => {
        id = Form.id = 1;
        spy = Form.$store = {
          dispatch: sinon.spy(),
        };

        obj = {
          id,
        };

        spy.dispatch.withArgs(Constants.GET_VENDOR, obj);
      });

      it('should load when there is a validate product', () => {
        Form.methods.load.apply(Form);
        expect(spy.dispatch).to.have.been.calledWith(Constants.GET_VENDOR, obj);
      });

      it('should not load when there is an invalidate product', () => {
        Form.id = 0;
        Form.methods.load.apply(Form);
        expect(spy.dispatch).to.have.not.been.called;
      });
    });

    it('should refresh', () => {
      Form.value = {
        id: 1,
        description: 'Derp',
      };
      const vendor = Form.vendor = {
        id: 1,
        description: 'JLC',
      };

      Form.methods.refresh.apply(Form);

      expect(Form.value).to.deep.equal(vendor);
    });

    describe('validate', () => {

    });
  });
});
