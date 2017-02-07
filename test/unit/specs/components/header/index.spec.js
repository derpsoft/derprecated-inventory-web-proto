// import VueComponent from 'unit/utils';
import Header from 'components/header/index';

describe('Header - Index.vue', () => {
  // it('should set the name', () => {
  //   console.log(VueComponent(Header));
  // });

  it('should set data', () => {
    const data = Header.data();
    expect(data.appVersion).to.not.be.undefined;
  });
});
