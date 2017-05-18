import Constants from 'src/constants';
import Edit from 'components/products/edit';

describe('Edit Products Component', () => {
  it('should have a name', () => {
    expect(Edit.name).to.equal('productEdit');
  });

  it('should have data', () => {
    const data = Edit.data();

    expect(data.showImages).to.not.be.ok;
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
  });

  describe('methods', () => {
    describe('delete', () => {
      describe('delete confirmation', () => {
        let deleteSpy;
        let stub;

        beforeEach(() => {
          Edit.deleteProduct = () => {};
          deleteSpy = sinon.spy(Edit, 'deleteProduct');
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
      const redirect = Edit.redirect = () => {};
      const obj = {
        id,
        redirect,
      };

      const spy = Edit.$store = {
        dispatch: sinon.spy(),
      };

      Edit.methods.deleteProduct.apply(Edit);

      sinon.assert.calledOnce(spy.dispatch);
      spy.dispatch.withArgs(Constants.DELETE_PRODUCT, obj);
    });
  });

  describe('mounted', () => {
    it('should reload', () => {
      Edit.reload = () => {};

      const reloadSpy = sinon.spy(Edit, 'reload');

      Edit.mounted.apply(Edit);
      expect(reloadSpy).to.have.been.called;
    });
  });
});
