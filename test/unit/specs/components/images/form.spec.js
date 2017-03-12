import Constants from 'src/constants';
import Form from 'components/images/form';

describe('Image Form', () => {
  it('it should return data', () => {
    const data = Form.data();

    expect(data.value.productIds).to.be.an('Array');
  });

  describe('computed', () => {
    it('should return products', () => {
      Form.value = {
        id: 1,
        description: 'cat',
      };
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
      expect(result).to.deep.equal(store.getters.products);
    });

    it('should return associated products', () => {
      const value = Form.value = {
        products: [{
          id: 1,
          description: 'cat',
        }],
      };

      const result = Form.computed.associatedProducts.apply(Form);

      expect(result).to.deep.equal(value.products);
    });
  });

  describe('mounted', () => {
    it('should retrieve categories', () => {
      const skip = 0;
      const take = 1000;
      const spy = Form.$store = {
        dispatch: sinon.spy(),
      };

      spy.dispatch.withArgs(Constants.GET_PRODUCTS, {
        skip,
        take,
      });
      Form.mounted();

      expect(spy.dispatch).to.have.been.calledWith(Constants.GET_PRODUCTS, {
        skip,
        take,
      });
    });
  });

  describe('methods', () => {
    describe('refresh', () => {
      it('should refresh only when image is available', () => {
        Form.validate = () => {};
        Form.value = {
          id: 1,
          description: 'cats trees',
        };
        const image = Form.image = {
          id: 1,
          description: 'cat trees',
          weight: '1 lb',
        };
        const validateSpy = sinon.spy(Form, 'validate');

        Form.methods.refresh.apply(Form);

        expect(validateSpy).to.have.been.called;
        expect(Form.value).to.deep.equal(image);
      });

      it('should not refresh when image is not available', () => {
        Form.validate = () => {};
        const value = Form.value = {
          id: 1,
          description: 'cats trees',
        };
        Form.image = null;
        const validateSpy = sinon.spy(Form, 'validate');

        Form.methods.refresh.apply(Form);

        expect(validateSpy).to.not.have.been.called;
        expect(Form.value).to.deep.equal(value);
      });
    });

    it('should validate on change', () => {
      Form.validate = () => {};
      const validateSpy = sinon.spy(Form, 'validate');

      Form.methods.change.apply(Form);
      expect(validateSpy).to.have.been.called;
    });

    it('should set parent', () => {
      const product = {
        id: 1,
        description: 'LEDS',
      };

      Form.value = {
        productIds: 0,
      };

      Form.methods.setProducts.apply(Form, [product]);

      expect(Form.value.productIds).to.equal(product);
    });

    describe('validate', () => {

    });
  });
});
