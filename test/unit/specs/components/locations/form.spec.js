import Constants from 'src/constants';
import Form from 'components/locations/form';

describe('Location Form', () => {
  it('it should return data', () => {
    const data = Form.data();

    expect(data.value).to.be.empty;
  });

  describe('computed', () => {
    it('should return warehouses', () => {
      const store = Form.$store = {
        getters: {
          warehouses: [1, 2],
        },
      };

      const result = Form.computed.warehouses.apply(Form);

      expect(result).to.deep.equal(store.getters.warehouses);
    });

    it('should return warehouse id', () => {
      Form.value = {
        warehouseId: 1,
      };

      const result = Form.computed.warehouseId.apply(Form);

      expect(result).to.equal(Form.value.warehouseId);
    });

    it('should return parent', () => {
      const store = Form.$store = {
        getters: {
          warehouse: sinon.spy(),
        },
      };

      Form.computed.warehouse.apply(Form);

      expect(store.getters.warehouse).to.have.been.called;
    });
  });

  describe('mounted', () => {
    it('should retrieve warehouses', () => {
      const skip = 0;
      const take = 1000;
      const spy = Form.$store = {
        dispatch: sinon.spy(),
      };

      spy.dispatch.withArgs(Constants.GET_WAREHOUSES, {
        skip,
        take,
      });
      Form.mounted();

      expect(spy.dispatch).to.have.been.calledWith(Constants.GET_WAREHOUSES, {
        skip,
        take,
      });
    });
  });

  describe('methods', () => {
    describe('refresh', () => {
      let store;
      let location;
      let validateSpy;
      let id;
      let obj;

      beforeEach(() => {
        location = Form.location = {
          id: 1,
          desc: 'LA',
        };
        store = Form.$store = {
          dispatch: sinon.spy(),
        };
        id = Form.warehouseId = 1;
        obj = {
          id,
          includeDeleted: true,
        };
        Form.value = {};
        Form.validate = () => {};

        validateSpy = sinon.spy(Form, 'validate');
      });

      it('should refresh location', () => {
        Form.methods.refresh.apply(Form);

        expect(Form.value).to.deep.equal(location);
        expect(validateSpy).to.have.been.called;
      });

      it('should not refresh location', () => {
        Form.value = undefined;
        Form.location = undefined;

        Form.methods.refresh.apply(Form);

        expect(Form.value).to.be.empty;
        expect(validateSpy).to.not.have.been.called;
      });

      it('should refresh warehouse', () => {
        store.dispatch.withArgs(Constants.GET_WAREHOUSE, obj);

        Form.methods.refresh.apply(Form);
        expect(store.dispatch).to.have.been.calledWith(Constants.GET_WAREHOUSE, obj);
      });

      it('should not refresh warehouse', () => {
        Form.warehouseId = 0;
        Form.methods.refresh.apply(Form);
        expect(store.dispatch).to.have.not.been.called;
      });
    });

    it('should validate on change', () => {
      Form.validate = () => {};
      const validateSpy = sinon.spy(Form, 'validate');

      Form.methods.change.apply(Form);
      expect(validateSpy).to.have.been.called;
    });

    it('should set parent', () => {
      const warehouse = {
        id: 1,
        description: 'JLC',
      };

      Form.value = {
        warehouseId: 0,
      };

      Form.methods.setWarehouse.apply(Form, [warehouse]);

      expect(Form.value.warehouseId).to.equal(warehouse.id);
    });

    describe('validate', () => {

    });
  });
});
