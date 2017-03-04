import Constants from 'src/constants';
import Edit from 'components/vendors/edit';

describe('Edit Vendors Component', () => {
  it('should have a name', () => {
    expect(Edit.name).to.equal('editVendor');
  });

  it('should have data', () => {
    const data = Edit.data();

    expect(data).to.be.empty;
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

    it('should return vendor', () => {
      const spy = Edit.$store = {
        getters: {
          vendor: sinon.spy(),
        },
      };
      const id = Edit.id = 1;
      spy.getters.vendor.withArgs(id);
      const vendor = Edit.computed.vendor.apply(Edit);

      expect(spy.getters.vendor).to.have.been.calledWith(id);
      expect(vendor).to.equal(spy.getters.vendor());
    });
  });

  describe('methods', () => {
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
      const rowVersion = Edit.vendor = {
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
      spy.dispatch.withArgs(Constants.DELETE_VENDOR, obj);
    });
  });
});
