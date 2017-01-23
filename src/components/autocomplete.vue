<template>
<div style="position:relative" :class="{'open':openSuggestion}">
  <input class="form-control" type="text" v-model="query" @keydown.enter='enter' @keydown.down='down' @keydown.up='up' @input='change' />
  <ul class="dropdown-menu" style="width:100%">
    <li v-for="(suggestion, index) in displays" :class="{'active': isActive(index)}" @click="suggestionClick(index)">
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
      type: Object,
      required: false,
    },
  },

  watch: {
    selected: 'refresh'
  },

  mounted() {
    this.refresh();
  },

  computed: {
    matches() {
      return _.filter(this.suggestions, v => ~this.keySelector(v).indexOf(this.query));
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
  },

  methods: {
    refresh() {
      if (this.selected) {
        this.query = this.keySelector(this.selected);
        this.enter();
      }
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
      const value = this.values[index];
      const display = this.displays[index];
      this.open = false;
      this.query = display;
      this.$emit('change', value);
    },
  }
};
</script>
