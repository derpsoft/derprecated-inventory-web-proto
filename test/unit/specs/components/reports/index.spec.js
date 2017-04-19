import Constants from 'src/constants';
import Report from 'components/reports/index';

describe('Report', () => {
  it('should have a name', () => {
    expect(Report.name).to.equal('reportView');
  });

  // describe('computed', () => {
  //   it('should return salesByProduct', () => {
  //     const store = Report.$store = {
  //       getters: {
  //         salesByProduct: [1],
  //       },
  //     };

  //     const result = Report.computed.salesByProduct.apply(Report);

  //     expect(result).to.deep.equal(store.getters.salesByProduct);
  //   });

  //   it('should return salesByVendor', () => {
  //     const store = Report.$store = {
  //       getters: {
  //         salesByVendor: [1],
  //       },
  //     };

  //     const result = Report.computed.salesByVendor.apply(Report);

  //     expect(result).to.deep.equal(store.getters.salesByVendor);
  //   });

  //   it('should return salesByTotal', () => {
  //     const store = Report.$store = {
  //       getters: {
  //         salesByTotal: [1],
  //       },
  //     };

  //     const result = Report.computed.salesByTotal.apply(Report);

  //     expect(result).to.deep.equal(store.getters.salesByTotal);
  //   });
  // });

 // describe('mounted', () => {
 //   let store;
 //
 //   beforeEach(() => {
 //     store = Report.$store = {
 //       dispatch: sinon.spy(),
 //     };
 //   });
 //
 //   it('should get sales by total', () => {
 //     const obj = {
 //       groupBy: 'week',
 //     };
 //     store.dispatch.withArgs(Constants.GET_SALES_BY_TOTAL, obj);
 //     Report.mounted();
 //     expect(store.dispatch).to.have.been.calledWith(Constants.GET_SALES_BY_TOTAL, obj);
 //   });
 //
 //   it('should get sales by product', () => {
 //     const obj = {
 //       groupBy: 'week',
 //       productId: 1,
 //     };
 //     store.dispatch.withArgs(Constants.GET_SALES_BY_PRODUCT, obj);
 //     Report.mounted();
 //     expect(store.dispatch).to.have.been.calledWith(Constants.GET_SALES_BY_PRODUCT, obj);
 //   });
 //
 //   it('should get sales by vendor', () => {
 //     const obj = {
 //       groupBy: 'week',
 //       vendorId: 1,
 //     };
 //     store.dispatch.withArgs(Constants.GET_SALES_BY_VENDOR, obj);
 //     Report.mounted();
 //     expect(store.dispatch).to.have.been.calledWith(Constants.GET_SALES_BY_VENDOR, obj);
 //   });
 // });
});
