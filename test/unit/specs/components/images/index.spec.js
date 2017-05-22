import Constants from 'src/constants';
import {
  Image as Api,
} from 'derp-api';
import Images from 'components/images/index';

describe('Images', () => {
  it('should return data', () => {
    const data = Images.data();

    expect(data.searchAction).to.equal(Constants.SEARCH_IMAGES);
    expect(data.listAction).to.equal(Constants.GET_IMAGES);
    expect(data.clearAction).to.equal(Constants.CLEAR_IMAGE_SEARCH);
    expect(data.showUpload).to.not.be.ok;
  });

  describe('computed', () => {
    it('should return image api', () => {
      const api = Images.computed.api.apply(Images);

      expect(api).to.be.instanceOf(Api);
    });

    it('should upload url', () => {
      const api = Images.api = {
        getImageUploadUrl: sinon.spy(),
      };
      const uploadUrl = Images.computed.uploadUrl.apply(Images);

      expect(uploadUrl).to.equal(api.getImageUploadUrl());
      expect(api.getImageUploadUrl).to.have.been.called;
    });
  });

  describe('methods', () => {
    it('should return xhr intercept', () => {
      const spy = Images.api = {
        imageUploadIntercept: sinon.spy(),
      };
      const file = '1.jpg';
      const xhr = {
        some: 'object',
      };

      spy.imageUploadIntercept.withArgs(file, xhr);

      const result = Images.methods.xhrIntercept.apply(Images, [file, xhr]);

      expect(result).to.equal(spy.imageUploadIntercept());
      expect(spy.imageUploadIntercept).to.have.been.calledWith(file, xhr);
    });

    it('should upload image', () => {
      const spy = Images.$refs = {
        search: {
          search: sinon.spy(),
        },
      };

      Images.methods.imageUploaded.apply(Images);

      expect(spy.search.search).to.have.been.called;
    });
  });
});
