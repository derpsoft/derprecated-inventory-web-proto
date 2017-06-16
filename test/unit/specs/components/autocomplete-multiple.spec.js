import Autocomplete from 'components/autocomplete-multiple';

describe('Autocomplete Multiple', () => {
  it('should default data', () => {
    const data = Autocomplete.data();

    expect(data.open).to.not.be.ok;
    expect(data.current).to.equal(0);
    expect(data.query).to.be.empty;
    expect(data.query).to.be.an('String');
    expect(data.selections).to.be.empty;
    expect(data.selections).to.be.an('Array');
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
      expect(props.selected.type).to.equal(Array);
      expect(props.selected.required).to.not.be.ok;
      expect(props.selected.default).to.be.a('Function');
      expect(props.selected.default()).to.deep.equal([]);
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
    it('should refresh selections', () => {
      const selection = Autocomplete.selected = [1, 2, 3, 4];
      Autocomplete.selections = [1];

      Autocomplete.methods.refresh.apply(Autocomplete);

      expect(Autocomplete.selections).to.have.a.lengthOf(4);
      expect(Autocomplete.selections).to.deep.equal(selection);
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
        expect(Autocomplete.current).to.equal(0);
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

    it('should remove selected', () => {
      Autocomplete.$emit = () => {};
      const selection = Autocomplete.selections = [1, 2, 3, 4];

      Autocomplete.methods.removeSelected.apply(Autocomplete, [2]);

      expect(selection).to.deep.equal([1, 2, 4]);
    });

    it('should select on click', () => {
      Autocomplete.$emit = () => {};
      Autocomplete.matches = [1];
      Autocomplete.selectionValues = 1;
      Autocomplete.selections = [];

      const spy = sinon.spy(Autocomplete, '$emit');
      const event = 'change';

      spy.withArgs(event, Autocomplete.selectionValues);

      Autocomplete.methods.suggestionClick.apply(Autocomplete, [1]);

      expect(Autocomplete.open).to.not.be.ok;
      expect(Autocomplete.query).to.be.empty;
      expect(Autocomplete.selections).to.have.a.lengthOf(1);
      expect(spy).to.have.been.calledWith(event, Autocomplete.selectionValues);
    });
  });
});
