import Constants from 'src/constants';
import List from 'components/inventory/list';

describe('Inventory List', () => {
  it('should mount', () => {
    const skip = 0;
    const take = 200;
    const params = {
      skip,
      take,
    };
    const spy = List.$store = {
      dispatch: sinon.spy(),
    };
    spy.dispatch.withArgs(Constants.GET_INVENTORY_LOGS, params);

    List.mounted();

    expect(spy.dispatch).to.have.been.calledTwice;
  });

  describe('computed', () => {
    it('should return count', () => {
      const count = List.$store = {
        getters: {
          logCount: 1,
        },
      };

      const result = List.computed.count.apply(List);
      expect(result).to.equal(count.getters.logCount);
    });

    it('should return logs', () => {
      const count = List.$store = {
        getters: {
          logs: 'log',
        },
      };

      const result = List.computed.logs.apply(List);
      expect(result).to.equal(count.getters.logs);
    });
  });
});
