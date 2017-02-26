import Gallery from 'components/images/gallery';

describe('Gallery.vue - Image', () => {
  it('should have a name', () => {
    expect(Gallery.name).to.equal('imageGallery');
  });

  it('should default props', () => {
    const emptyArray = [];
    expect(Gallery.props.images.default.call()).to.deep.equal(emptyArray);
    expect(Gallery.props.onDelete.default.call()).to.be.undefined;
    expect(Gallery.props.onSending.default.call()).to.be.undefined;
  });

  it('should filter to SSL', () => {
    const link = 'http://www.derp.com';
    const linkSSL = 'https://www.derp.com';
    const result = Gallery.filter.toSsl.apply(Gallery, [link]);

    expect(result).to.equal(linkSSL);
  });

  it('should load images when data returns from the server', () => {
    const file = {};
    const json = {
      result: 'img.src',
    };

    Gallery.images = [];
    Gallery.methods.onSuccess.apply(Gallery, [file, json]);

    expect(Gallery.images[0]).to.equal(json.result);
  });
});
