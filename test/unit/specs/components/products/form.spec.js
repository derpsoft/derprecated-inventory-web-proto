import Constants from 'src/constants';
import Form from 'components/products/form';

describe('Product Form', () => {
  it('should default data', () => {
    const data = Form.data();

    expect(data.toggle).to.be.not.ok;
    expect(data.value).to.be.empty;
    expect(data.displayImage).to.be.empty;
  });

  it('should mount', () => {
    Form.load = () => {};
    const spy = sinon.spy(Form, 'load');

    Form.mounted();

    expect(spy).to.have.been.called;
  });

  describe('computed', () => {
    it('should return product', () => {
      const store = Form.$store = {
        getters: {
          product: sinon.spy(),
        },
      };

      const id = Form.id = 1;

      Form.computed.product.apply(Form);

      expect(store.getters.product).to.have.been.calledWith(id);
    });

    it('should return vendors', () => {
      const store = Form.$store = {
        getters: {
          vendors: {
            id: 1,
            name: 'JLC',
          },
        },
      };

      const vendors = Form.computed.vendors.apply(Form);

      expect(vendors).to.equal(store.getters.vendors);
    });

    it('should return vendor', () => {
      const store = Form.$store = {
        getters: {
          vendor: sinon.spy(),
        },
      };

      const value = Form.value = {
        vendorId: 1,
      };

      store.getters.vendor.withArgs(value.vendorId);

      Form.computed.vendor.apply(Form);

      expect(store.getters.vendor).to.have.been.calledWith(value.vendorId);
    });

    it('should return categories', () => {
      const store = Form.$store = {
        getters: {
          categories: {
            id: 1,
          },
        },
      };

      const result = Form.computed.categories.apply(Form);

      expect(result).to.equal(store.getters.categories);
    });

    it('should return category', () => {
      const store = Form.$store = {
        getters: {
          categories: [{
            id: 1,
            name: 'JLC',
          }, {
            id: 2,
            name: 'Derp',
          }],
        },
      };

      Form.value = {
        categoryId: 1,
      };

      const result = Form.computed.category.apply(Form);

      expect(result).to.deep.equal(store.getters.categories[0]);
    });
  });

  describe('methods', () => {
    describe('refresh', () => {
      it('should refresh product data', () => {
        const product = Form.product = {
          id: 1,
          name: 'Derp',
        };

        Form.value = {
          id: 1,
          name: 'JLC',
        };

        Form.methods.refresh.apply(Form);

        expect(Form.value).to.deep.equal(product);
      });

      it('should not refresh product data', () => {
        const value = Form.value = {
          id: 1,
          name: 'JLC',
        };

        Form.methods.refresh.apply(Form);

        expect(Form.value).to.not.deep.equal(value);
      });
    });

    describe('load', () => {
      let store;
      let filter;

      beforeEach(() => {
        store = Form.$store = {
          dispatch: sinon.spy(),
        };

        filter = {
          skip: 0,
          take: 1000,
        };

        Form.methods.load.apply(Form);
      });

      it('should retrieve vendors', () => {
        store.dispatch.withArgs(Constants.GET_VENDORS, filter);
        expect(store.dispatch).to.have.been.calledWith(Constants.GET_VENDORS, filter);
      });

      it('should retrieve categories', () => {
        store.dispatch.withArgs(Constants.GET_CATEGORIES, filter);
        expect(store.dispatch).to.have.been.calledWith(Constants.GET_CATEGORIES, filter);
      });
    });

    it('should set vendor', () => {
      const vendor = {
        id: 1,
        name: 'JLC',
      };

      Form.value = {
        vendorId: 0,
      };

      Form.methods.setVendor.apply(Form, [vendor]);

      expect(Form.value.vendorId).to.equal(vendor.id);
    });

    it('should set category', () => {
      const category = {
        id: 1,
        name: 'cat trees',
      };

      Form.value = {
        categoryId: 0,
      };

      Form.methods.setCategory.apply(Form, [category]);

      expect(Form.value.categoryId).to.equal(category.id);
    });
  });
});
