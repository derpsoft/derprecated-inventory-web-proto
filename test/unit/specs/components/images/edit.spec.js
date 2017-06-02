import Constants from 'src/constants';
import Edit from 'components/images/edit';

describe('Edit Image Component', () => {
  it('should have a name', () => {
    expect(Edit.name).to.equal('imageEdit');
  });

  describe('computed', () => {
    it('should return the id', () => {
      Edit.$route = {
        params: {
          id: 1,
        },
      };

      const result = Edit.computed.id.apply(Edit);

      expect(result).to.equal(1);
    });

    it('should return image', () => {
      const store = Edit.$store = {
        getters: {
          image: sinon.spy(),
        },
      };

      Edit.computed.image.apply(Edit);

      expect(store.getters.image).to.have.been.called;
    });
  });

  describe('methods', () => {
    it('should validate', () => {
      const spy = Edit.$refs = {
        imageForm: {
          validate: sinon.spy(),
        },
      };

      const result = Edit.methods.validate.apply(Edit);

      expect(spy.imageForm.validate).to.have.been.called;
      expect(result).to.equal(spy.imageForm.validate());
    });

    it('should load image', () => {
      const id = Edit.id = 1;
      const spy = Edit.$store = {
        dispatch: sinon.spy(),
      };
      const obj = {
        id,
      };
      Edit.methods.load.apply(Edit);

      sinon.assert.calledWith(spy.dispatch);
      spy.dispatch.withArgs(Constants.GET_IMAGE, obj);
    });

    describe('delete', () => {
      describe('delete confirmation', () => {
        let deleteSpy;
        let stub;

        beforeEach(() => {
          Edit.delete = () => {};
          deleteSpy = sinon.spy(Edit, 'delete');
          stub = sinon.stub(window, 'confirm');
        });

        afterEach(() => {
          deleteSpy.restore();
          stub.restore();
        });

        it('should allow delete', () => {
          const message = 'Are you sure you want to delete?';

          stub.returns(true);

          Edit.methods.deleteConfirm.apply(Edit);

          expect(deleteSpy).to.have.been.called;
          expect(stub).to.have.been.called;
          sinon.assert.calledOnce(stub);
          stub.withArgs(message);
        });

        it('should not allow delete', () => {
          stub.returns(false);

          Edit.methods.deleteConfirm.apply(Edit);

          expect(deleteSpy).to.have.not.been.called;
          expect(stub).to.have.been.called;
        });
      });
    });

    it('should delete', () => {
      const id = Edit.id = 1;
      const rowVersion = Edit.image = {
        rowVersion: 1111,
      };
      const redirect = Edit.redirect = () => {};
      const obj = {
        id,
        rowVersion,
        redirect,
      };

      const spy = Edit.$store = {
        dispatch: sinon.spy(),
      };

      Edit.methods.delete.apply(Edit);

      sinon.assert.calledOnce(spy.dispatch);
      spy.dispatch.withArgs(Constants.DELETE_IMAGE, obj);
    });
  });

  describe('mounted', () => {
    it('should load', () => {
      Edit.load = () => {};
      const loadSpy = sinon.spy(Edit, 'load');

      Edit.mounted.apply(Edit);
      expect(loadSpy).to.have.been.called;
    });
  });
});
