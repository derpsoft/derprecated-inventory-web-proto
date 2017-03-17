import Constants from 'src/constants';
import Form from 'components/categories/form';

describe('Category Form', () => {
  it('it should return data', () => {
    const data = Form.data();

    expect(data.value).to.be.empty;
  });

  describe('computed', () => {
    it('should return categories', () => {
      Form.value = {
        id: 1,
        description: 'cat',
      };
      const store = Form.$store = {
        getters: {
          categories: [{
            id: 1,
            description: 'cat',
          }, {
            id: 2,
            description: 'LEDs',
          }],
        },
      };

      const result = Form.computed.categories.apply(Form);

      expect(result).to.be.an('Array');
      expect(result[0]).to.deep.equal(store.getters.categories[1]);
    });

    it('should return parent', () => {
      const value = Form.value = {
        id: 100,
        parentId: 10,
        description: 'Cat',
      };
      const store = Form.$store = {
        getters: {
          category: () => value,
        },
      };

      const spy = sinon.spy(store.getters, 'category');

      const result = Form.computed.parent.apply(Form);

      spy.withArgs(value.parentId);

      expect(spy).to.have.been.calledWith(value.parentId);
      expect(result).to.deep.equal(value);
    });
  });

  describe('mounted', () => {
    it('should retrieve categories', () => {
      const skip = 0;
      const take = 1000;
      const spy = Form.$store = {
        dispatch: sinon.spy(),
      };

      spy.dispatch.withArgs(Constants.GET_CATEGORIES, {
        skip,
        take,
      });
      Form.mounted();

      expect(spy.dispatch).to.have.been.calledWith(Constants.GET_CATEGORIES, {
        skip,
        take,
      });
    });
  });

  describe('methods', () => {
    describe('refresh', () => {
      it('should refresh only when category is available', () => {
        Form.validate = () => {};
        Form.value = {
          id: 1,
          description: 'cats trees',
        };
        const category = Form.category = {
          id: 1,
          description: 'cat trees',
          weight: '1 lb',
        };
        const validateSpy = sinon.spy(Form, 'validate');

        Form.methods.refresh.apply(Form);

        expect(validateSpy).to.have.been.called;
        expect(Form.value).to.deep.equal(category);
      });

      it('should not refresh when category is not available', () => {
        Form.validate = () => {};
        const value = Form.value = {
          id: 1,
          description: 'cats trees',
        };
        Form.category = null;
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
      const parentCategory = {
        id: 1,
        description: 'LEDS',
      };

      Form.value = {
        parentId: 0,
      };

      Form.methods.setParent.apply(Form, [parentCategory]);

      expect(Form.value.parentId).to.equal(parentCategory.id);
    });

    describe('validate', () => {

    });
  });
});
