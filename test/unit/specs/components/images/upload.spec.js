import Upload from 'components/images/upload';

describe('Image Upload', () => {
  it('should have a name', () => {
    const data = Upload.data();
    expect(data).to.be.empty;
  });

  describe('computed', () => {
    it('should return zone', () => {
      const dz = Upload.$refs = {
        dz: 1234,
      };
      const zone = Upload.computed.zone.apply(Upload);

      expect(zone).to.equal(dz.dz);
    });
  });

  describe('methods', () => {
    it('shouuld fire on success', () => {
      Upload.$emit = () => {};
      const file = '1.jpg';
      const zoneSpy = Upload.zone = {
        removeFile: sinon.spy(),
      };
      const emitSpy = sinon.spy(Upload, '$emit');
      const success = 'success';
      zoneSpy.removeFile.withArgs(file);
      emitSpy.withArgs(success);

      Upload.methods.onSuccess.apply(Upload, [file]);

      expect(zoneSpy.removeFile).to.have.been.calledWith(file);
      expect(emitSpy).to.have.been.calledWith(success);
    });
  });
});
