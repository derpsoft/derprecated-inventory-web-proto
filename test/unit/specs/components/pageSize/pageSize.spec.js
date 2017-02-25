import PageSize from 'components/pageSize/pageSize';

describe('Page Size', () => {
  describe('Props', () => {
    it('should have pageSize', () => {
      expect(PageSize.props.pageSize).to.be.defined;
      expect(PageSize.props.pageSize.type).to.equal(Number);
      expect(PageSize.props.pageSize.required).to.be.ok;
    });

    it('should have callback', () => {
      expect(PageSize.props.callback).to.be.defined;
      expect(PageSize.props.callback.type).to.equal(Function);
      expect(PageSize.props.callback.required).to.be.ok;
    });
  });

  it('should default pageSizes', () => {
    const data = PageSize.data();
    const pageSizes = [10, 25, 50, 100];
    expect(data.pageSizes).to.deep.equal(pageSizes);
  });

  it('should set the page size', () => {
    PageSize.callback = () => {};
    const pageSize = [10, 25, 50, 100];
    const spy = sinon.stub(PageSize, 'callback');

    PageSize.methods.setPageSize.apply(PageSize, [pageSize]);

    spy.calledWith(pageSize);
    sinon.assert.calledOnce(spy);
  });
});
