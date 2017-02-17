<style scoped>
.tags {
  background: #FFFFFF;
  border: solid 1px #CCCCCC;
  padding: 3px;

  .tag {
    border: solid 1px #CCCCCC;
    padding: 2px 5px;
    margin: 0 2px;
    border-radius: 5px;
  }
  input {
    border: none;
    outline: none;

    &:focus {
      border: none;
    }
  }
}
</style>

<template>
<div class="tags" @click.stop="refocus">
  <span class="head">
    <span class="tag" v-for="(tag, i) in head">
      {{tag}}
      <span @click.stop="removeTag()">x</span>
    </span>
  </span>

  <input ref="tagInput" type="text" v-model="newTag" @keyup.space="addTag" @keyup.enter="addTag"
      @keyup.backspace="deleteTag" @keyup.left="left" @keyup.right="right" :style="{width}">

  <span class="tail">
    <span class="tag" v-for="(tag, i) in tail">
      {{tag}}
      <span @click.stop="removeTag()">x</span>
    </span>
  </span>
</div>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    tags: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  data() {
    return {
      source: [],
      index: 0,
      newTag: '',
    };
  },

  watch: {
    tags: 'refresh',
    head: 'refocus',
    tail: 'refocus',
  },

  computed: {
    head() {
      return _.take(this.source, this.index);
    },
    tail() {
      console.log(_.takeRight(this.source, this.source.length - this.index));
      return _.takeRight(this.source, this.source.length - this.index);
    },
    input() {
      return this.$refs.tagInput;
    },
    width() {
      return `${Math.max(50, (this.newTag.length * 8) + 10)}px`;
    },
  },

  methods: {
    refresh() {
      this.source = this.tags;
    },
    typing() {
      this.newTag = this.newTag.trim();
    },
    addTag() {
      const x = this.newTag.trim();
      if (x.length) {
        this.source.splice(this.index, 0, x);
        this.index += 1;
      }
      this.newTag = '';
    },
    deleteTag() {
      if (this.index) {
        this.source.splice(this.index - 1, 1);
        this.index = this.clamp(this.index, 0, this.source.length);
      }
    },
    left() {
      this.index = Math.max(0, this.index - 1);
      this.refocus();
    },
    right() {
      this.index = Math.min(this.source.length, this.index + 1);
      this.refocus();
    },
    refocus() {
      this.input.focus();
      this.input.selectionEnd = this.input.selectionStart = this.newTag.length;
    },
    clamp(val, min, max) {
      return Math.max(Math.min(val, max), min);
    }
  },
};
</script>
