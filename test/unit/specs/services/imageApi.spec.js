import ImageApi from 'services/imageApi';
import Constants from 'src/constants';

describe('Image API', () => {
  let imageApi;

  beforeEach(() => {
    imageApi = new ImageApi();
  });

  it('should have the base CRUD commands', () => {
    expect(imageApi.count).to.be.an('function');
    expect(imageApi.list).to.be.an('function');
    expect(imageApi.single).to.be.an('function');
    expect(imageApi.typeahead).to.be.an('function');
    expect(imageApi.save).to.be.an('function');
    expect(imageApi.create).to.be.an('function');
    expect(imageApi.delete).to.be.an('function');
  });

  it('should Get Upload URL', () => {
    const url = `${Constants.API_ROOT}/api/v1/images`;
    const result = imageApi.getImageUploadUrl();

    expect(result).to.equal(url);
  });

  it('should intercept image upload', () => {
    // TODO: Stub Super
    // const spy = sinon.mock(imageApi._super, 'prepareXhr');
    // const file = 456;
    // const xhr = 123;
    //
    // spy.withArgs(xhr);
    //
    // imageApi.imageUploadIntercept(file, xhr);
    //
    // expect(spy).to.have.been.calledWith(xhr);
  });
});
