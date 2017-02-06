import Header from '../../../../../src/components/header/index.vue';

describe('Header - Index.vue', () => {
  it('should set the name', () => {
    expect(Header.name).to.equal('header');
  });

  it('should set data', () => {
    const data = Header.data();
    expect(data.appVersion).to.not.be.undefined;
  });
});
