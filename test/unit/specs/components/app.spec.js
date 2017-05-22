import App from 'components/app';
import Pace from 'pace-progress';

describe('App.vue', () => {
  it('should mount', () => {
    expect(App.mounted).to.be.a('function');
  });

  it('should have a name', () => {
    expect(App.name).to.equal('appView');
  });

  it('should start pace loader', () => {
    const spy = sinon.spy(Pace, 'start');
    App.mounted.call();
    sinon.assert.calledOnce(spy);
  });
});
