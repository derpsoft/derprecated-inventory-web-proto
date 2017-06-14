<style lang="css" >
.tags {
  position: relative;

  .tags-control {
    width: 100%;
    font-size: 0.875rem;
    background-color: #fff;
    border: 1px solid #e9ebec;
    padding: 0.22rem 0.2rem;

  }

  .tag-list {
    list-style-type: none;
    padding: 0;
    margin: 0;

    .tag-item {
      line-height: 25px;
      float: left;
      display: inline-block;
      font-size: 0.875rem;
      background: #fff;
      color: #9fabb8;
      border: 1px solid #e9ebec;
      border-radius: 5px;
      padding: 0 0.5rem;
    }

    .remove-tag {
      cursor: pointer;
    }
  }

  .tag-input {
    display: block;
    float: left;
    color: #9fabb8;
    margin: 0 0 0 0.5rem;
    outline: 0;
    border: 0;
    line-height: 25px;
  }

  .autocomplete {
    position: absolute;
    width: 100%;
    max-height: 300px;
    z-index: 100;
    list-style-type: none;
    padding: 0;
    margin: 3px 0 0 0;


    .selection {
      padding: 10px;
      background: #f9f9f9;
      border: 1px solid #f1f1f1;
      cursor: pointer;
      
      &:hover {
        background: #9fabb8;
        color: #fff;
      }
    }

  }
}

</style>

<template>
  <div class="tags">
    <div class="tags-control clearfix" :class="{'open':openSuggestion}" v-if="!disabled">
      <slot name="tag-list" :selectionList="selectionList" :selectionValues="selectionValues">
        <ul class="tag-list" v-if="drawSelections">
          <li v-for="(selection, index) in selectionList" class="tag-item">
            <span>{{ selection }}</span>
            <a class="remove-tag" @click="removeSelected(index)">x</a>
          </li>
        </ul>
      </slot>
      <input type="text" class="tag-input" v-model="query" v-focus.lazy="focus" @keydown.enter="enter" @keydown.down="down" @keydown.up="up" @input="change" :placeholder="placeholder" />
    </div>
    <ul class="autocomplete" v-show="open">
      <li class="selection" v-for="(suggestion, index) in displays" :class="{'active': isActive(index)}" @click="suggestionClick(index)">
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
    caseSensitive: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    placeholder: {
      type: String,
      required: false
    }
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
      const needle = this.caseSensitive ? this.query : this.query.toLowerCase();
      return _.filter(
        this.availableChoices,
        (v) => {
          const key = this.keySelector(v);
          const haystack = this.caseSensitive ? key : key.toLowerCase();
          return ~haystack.indexOf(needle);
        });
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

    isActive(index: number) {
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

    suggestionClick(index: number) {
      this.open = false;
      this.query = '';
      this.selections.push(this.matches[index]);
      this.$emit('change', this.selectionValues);
    },

    removeSelected(index: number) {
      this.selections.splice(index, 1);
      this.$emit('change', this.selectionValues);
    }
  }
};
</script>
