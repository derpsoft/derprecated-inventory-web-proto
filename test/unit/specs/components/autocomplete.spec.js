import Autocomplete from 'components/autocomplete';

describe('Autocomplete', () => {
  it('should default data', () => {
    const data = Autocomplete.data();

    expect(data.open).to.not.be.ok;
    expect(data.current).to.equal(0);
    expect(data.query).to.be.empty;
    expect(data.query).to.be.an('String');
  });

  describe('props', () => {
    let props;

    beforeEach(() => {
      props = Autocomplete.props;
    });

    it('should have keySelector', () => {
      expect(props.keySelector.type).to.equal(Function);
      expect(props.keySelector.required).to.not.be.ok;
      expect(props.keySelector.default).to.equal(JSON.stringify);
    });

    it('should have valueSelector', () => {
      const value = {
        id: 1,
      };

      expect(props.valueSelector.type).to.equal(Function);
      expect(props.valueSelector.required).to.not.be.ok;
      expect(props.valueSelector.default).to.be.a('Function');
      expect(props.valueSelector.default(value)).to.equal(value.id);
    });

    it('should have displaySelector', () => {
      expect(props.displaySelector.type).to.equal(Function);
      expect(props.displaySelector.required).to.not.be.ok;
      expect(props.displaySelector.default).to.equal(JSON.stringify);
    });

    it('should have suggestions', () => {
      expect(props.suggestions.type).to.equal(Array);
      expect(props.suggestions.required).to.be.ok;
    });

    it('should have selected', () => {
      expect(props.selected.type).to.equal(Object);
      expect(props.selected.required).to.not.be.ok;
    });

    it('should have focus', () => {
      expect(props.focus.type).to.equal(Boolean);
      expect(props.focus.required).to.not.be.ok;
      expect(props.focus.default).to.not.be.ok;
    });
  });

  describe('mounted', () => {
    it('should mount and refresh', () => {
      Autocomplete.refresh = () => {};

      const spy = sinon.spy(Autocomplete, 'refresh');

      Autocomplete.mounted();

      expect(spy).to.have.been.called;
    });
  });

  describe('computed', () => {
    // TODO: computed on autocomplete
    it('should return available choices', () => {

    });
  });

  describe('methods', () => {
    describe('refresh', () => {
      let spySelector;
      let spyEnter;

      beforeEach(() => {
        Autocomplete.keySelector = id => id;
        Autocomplete.selected = null;
        Autocomplete.enter = () => {};
        Autocomplete.query = '';
        spySelector = sinon.spy(Autocomplete, 'keySelector');
        spyEnter = sinon.spy(Autocomplete, 'enter');
      });

      it('should refresh', () => {
        const id = Autocomplete.selected = 1;

        Autocomplete.methods.refresh.apply(Autocomplete);

        expect(spySelector).to.have.been.calledWith(Autocomplete.selected);
        expect(spyEnter).to.have.been.called;
        expect(Autocomplete.query).to.equal(id);
      });

      it('should not refresh', () => {
        Autocomplete.methods.refresh.apply(Autocomplete);

        expect(spySelector).to.not.have.been.calledWith(Autocomplete.selected);
        expect(spyEnter).to.not.have.been.called;
        expect(Autocomplete.query).to.be.empty;
      });
    });

    describe('key up', () => {
      it('should update the current if greater than 0', () => {
        Autocomplete.current = 2;

        Autocomplete.methods.up.apply(Autocomplete);

        expect(Autocomplete.current).to.equal(1);
      });

      it('should not update the current', () => {
        Autocomplete.current = -1;

        Autocomplete.methods.up.apply(Autocomplete);

        expect(Autocomplete.current).to.equal(-1);
      });
    });

    describe('key down', () => {
      it('should update the current if less than suggestions', () => {
        Autocomplete.current = 2;
        Autocomplete.suggestions = [1, 2];

        Autocomplete.methods.down.apply(Autocomplete);

        expect(Autocomplete.current).to.equal(2);
      });

      it('should not update the current', () => {
        Autocomplete.current = 2;
        Autocomplete.suggestions = [1, 2, 3, 4];

        Autocomplete.methods.down.apply(Autocomplete);

        expect(Autocomplete.current).to.equal(3);
      });
    });

    describe('change', () => {
      beforeEach(() => {
        Autocomplete.open = false;
        Autocomplete.current = -1;
        Autocomplete.query = '';
      });

      it('should change if not open and query length', () => {
        Autocomplete.query = 'some query';

        Autocomplete.methods.change.apply(Autocomplete);

        expect(Autocomplete.open).to.be.ok;
        expect(Autocomplete.current).to.equal(0);
      });

      it('should change if not open and no query length', () => {
        Autocomplete.methods.change.apply(Autocomplete);

        expect(Autocomplete.open).to.not.be.ok;
        expect(Autocomplete.current).to.equal(-1);
      });
    });

    it('should check if the current hovered is current selected', () => {
      Autocomplete.current = 1;

      const result = Autocomplete.methods.isActive.apply(Autocomplete, [1]);

      expect(result).to.be.ok;
    });

    it('should select selection when selected', () => {
      Autocomplete.suggestionClick = () => {};
      Autocomplete.current = 1;

      const spy = sinon.spy(Autocomplete, 'suggestionClick');
      spy.withArgs(Autocomplete.current);

      Autocomplete.methods.enter.apply(Autocomplete);

      expect(spy).to.have.been.calledWith(Autocomplete.current);
    });

    it('should select on click', () => {
      const index = 1;
      Autocomplete.$emit = () => {};
      const values = Autocomplete.values = [10, 20, 30, 40];
      const displays = Autocomplete.displays = [10, 20, 30, 40];
      const spy = sinon.spy(Autocomplete, '$emit');
      const event = 'change';

      spy.withArgs(event, values[index]);

      Autocomplete.methods.suggestionClick.apply(Autocomplete, [index]);

      expect(Autocomplete.open).to.not.be.ok;
      expect(Autocomplete.query).to.equal(displays[index]);
      expect(spy).to.have.been.calledWith(event, values[index]);
    });
  });
});
