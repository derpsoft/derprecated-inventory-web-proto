<style lang="css" scoped>
.dropdown-menu {
  position: absolute;
  top: 30px;
}
.selection-list {
  a {
    display: inline-block;
    padding: 3px;
    cursor: pointer;
  }
}
</style>

<template>
<div style="position:relative" :class="{'open':openSuggestion}">
  <input class="form-control" type="text" v-model="query" v-focus.lazy="focus" @keydown.enter="enter"
      @keydown.down="down" @keydown.up="up" @input="change" />
  <slot name="selection-list" :selectionList="selectionList" :selectionValues="selectionValues">
    <ul class="selection-list" v-if="drawSelections">
      <li v-for="(selection, index) in selectionList">
        {{ selection }}<a @click="removeSelected(index)">X</a>
      </li>
    </ul>
  </slot>
  <ul class="dropdown-menu" style="width:100%">
    <li v-for="(suggestion, index) in displays" :class="{'active': isActive(index)}"
        @click="suggestionClick(index)">
      <a>{{ suggestion }}</a>
      </li>
  </ul>
</div>

</template>

<script>
import _ from 'lodash';

export default {

  data() {
    return {
      open: false,
      current: 0,
      query: '',
      selections: [],
    };
  },

  props: {
    keySelector: {
      type: Function,
      required: false,
      default: JSON.stringify,
    },
    valueSelector: {
      type: Function,
      required: false,
      default: v => v.id,
    },
    displaySelector: {
      type: Function,
      required: false,
      default: JSON.stringify,
    },
    suggestions: {
      type: Array,
      required: true
    },
    selected: {
      type: Array,
      required: false,
      default: () => [],
    },
    focus: {
      type: Boolean,
      required: false,
      default: false,
    },
    drawSelections: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  watch: {
    selected: 'refresh'
  },

  mounted() {
    this.refresh();
  },

  computed: {
    availableChoices() {
      return _.differenceBy(this.suggestions, this.selections, this.keySelector);
    },

    matches() {
      return _.filter(
        this.availableChoices,
        v => ~this.keySelector(v).indexOf(this.query)
      );
    },

    keys() {
      return this.matches.map(this.keySelector);
    },

    values() {
      return this.matches.map(this.valueSelector);
    },

    displays() {
      return this.matches.map(this.displaySelector);
    },

    openSuggestion() {
      return this.query && this.open && this.matches.length;
    },

    selectionList() {
      return _.map(this.selections, this.displaySelector);
    },
    selectionValues() {
      return _.map(this.selections, this.valueSelector);
    }
  },

  methods: {
    refresh() {
      this.selections = this.selected.slice();
    },

    up() {
      if (this.current > 0) {
        this.current -= 1;
      }
    },

    down() {
      if (this.current < this.suggestions.length - 1) {
        this.current += 1;
      }
    },

    isActive(index) {
      return index === this.current;
    },

    change() {
      if (!this.open && this.query.length) {
        this.open = true;
        this.current = 0;
      }
    },

    enter() {
      this.suggestionClick(this.current);
    },

    suggestionClick(index) {
      this.open = false;
      this.query = '';
      this.selections.push(this.matches[index]);
      this.$emit('change', this.selectionValues);
    },

    removeSelected(index) {
      this.selections.splice(index, 1);
    }
  }
};

</script>
