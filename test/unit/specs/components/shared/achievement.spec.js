import Achievement from 'components/shared/achievement';

describe('Achievement Component', () => {
  it('should have a name', () => {
    expect(Achievement.name).to.equal('achievement');
  });

  it('should default data', () => {
    const data = Achievement.data();

    expect(data.val).to.equal(0);
  });

  describe('props', () => {
    let props;
    beforeEach(() => {
      props = Achievement.props;
    });

    it('should have value', () => {
      expect(props.value).to.be.defined;
      expect(props.value.type).to.equal(Number);
      expect(props.value.default).to.equal(0);
      expect(props.value.required).to.be.ok;
    });

    it('should have title', () => {
      expect(props.title).to.be.defined;
      expect(props.title.type).to.equal(String);
      expect(props.title.required).to.be.ok;
    });

    it('should have filter', () => {
      expect(props.filter).to.be.defined;
      expect(props.filter.type).to.equal(Function);
    });

    it('should have by', () => {
      expect(props.by).to.be.defined;
      expect(props.by.type).to.equal(String);
      expect(props.by.required).to.be.ok;
    });

    it('should have icon', () => {
      expect(props.icon).to.be.defined;
      expect(props.icon.type).to.equal(String);
      expect(props.icon.required).to.be.ok;
    });
    it('should have brand', () => {
      expect(props.brand).to.be.defined;
      expect(props.brand.type).to.equal(String);
      expect(props.brand.default).to.equal('info');
      expect(props.brand.required).to.be.ok;
    });

  });

  describe('methods', () => {
    describe('format', () => {
      it('should format', () => {
        Achievement.filter = (value) => {
          return 1 + value;
        };
        const val = Achievement.val = 1;
        const spy = sinon.spy(Achievement, 'filter');
        Achievement.methods.format.apply(Achievement, [val]);

        sinon.assert.calledOnce(spy);
        expect(Achievement.val).to.equal(2);
      });

      it('should not format', () => {
        Achievement.filter = null;
        const val = Achievement.val = 1;

        Achievement.methods.format.apply(Achievement, [val]);

        expect(Achievement.val).to.equal(val);
      });
    });
  });
});
