import App from '../../../../src/components/app.vue';

describe('App.vue', () => {
  it('should mount', () => {
    expect(App.mounted).to.be.a('function');
  });

  it('should have a name', () => {
    expect(App.name).to.equal('appView');
  });
});
