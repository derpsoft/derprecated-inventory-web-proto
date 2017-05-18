import Constants from 'src/constants';
import Form from 'components/inventory/form';

describe('Inventory Form', () => {
  it('it should return data', () => {
    const data = Form.data();

    expect(data.value.quantity).to.equal(0);
    expect(data.value.productId).to.equal(0);
    expect(data.value.locationId).to.equal(0);
  });

  describe('computed', () => {
    it('should return products', () => {
      const store = Form.$store = {
        getters: {
          products: [{
            id: 1,
            description: 'cat',
          }, {
            id: 2,
            description: 'LEDs',
          }],
        },
      };

      const result = Form.computed.products.apply(Form);

      expect(result).to.be.an('Array');
      expect(result[0]).to.deep.equal(store.getters.products[0]);
    });

    it('should return product id', () => {
      const value = Form.value = {
        productId: 1,
      };

      const result = Form.computed.productId.apply(Form);

      expect(result).to.deep.equal(value.productId);
    });

    it('should return locations', () => {
      const store = Form.$store = {
        getters: {
          locations: [{
            id: 1,
            description: 'Los Angeles',
          }, {
            id: 2,
            description: 'City of Industry',
          }],
        },
      };

      const result = Form.computed.locations.apply(Form);

      expect(result).to.be.an('Array');
      expect(result[0]).to.deep.equal(store.getters.locations[0]);
    });

    it('should return location id', () => {
      const value = Form.value = {
        locationId: 1,
      };

      const result = Form.computed.locationId.apply(Form);

      expect(result).to.deep.equal(value.locationId);
    });
  });

  describe('mounted', () => {
    let store;

    beforeEach(() => {
      store = Form.$store = {
        dispatch: sinon.spy(),
      };
    });

    it('should retrieve products', () => {
      const skip = 0;
      const take = 1000;

      store.dispatch.withArgs(Constants.GET_PRODUCTS, {
        skip,
        take,
      });
      Form.mounted();

      expect(store.dispatch).to.have.been.calledWith(Constants.GET_PRODUCTS, {
        skip,
        take,
      });
    });

    it('should retrieve locations', () => {
      const skip = 0;
      const take = 1000;

      store.dispatch.withArgs(Constants.GET_LOCATIONS, {
        skip,
        take,
      });
      Form.mounted();

      expect(store.dispatch).to.have.been.calledWith(Constants.GET_LOCATIONS, {
        skip,
        take,
      });
    });
  });

  describe('methods', () => {
    it('should set product', () => {
      const product = {
        id: 1,
        description: 'LEDS',
      };

      Form.value = {
        productId: 0,
      };

      Form.methods.setProduct.apply(Form, [product]);

      expect(Form.value.productId).to.equal(product.id);
    });

    it('should set location', () => {
      const location = {
        id: 1,
        description: 'LEDS',
      };

      Form.value = {
        locationId: 0,
      };

      Form.methods.setLocation.apply(Form, [location]);

      expect(Form.value.locationId).to.equal(location.id);
    });

    describe('validate', () => {

    });
  });
});
