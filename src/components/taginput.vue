<style scoped>
.tags {
  cursor: text;
  background: #494b54;
  padding: 3px;
  border-radius: 4px;
  height: 34px;

  .tag {
    display: inline-block;
    border-radius: 5px;
    border: solid 1px #CCCCCC;
    margin: 0 2px;
    padding: 2px 5px;

    .close {
      cursor: pointer;
      color: #666666;
    }
  }
  input {
    height: 100%;
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
      <span class="close" @click.stop="removeTag()">x</span>
    </span>
  </span>

  <input ref="tagInput" type="text" v-model="newTag" @keyup.space="addTag" @keyup.enter="addTag"
      @keyup.backspace="deleteTag" @keyup.left="left" @keyup.right="right" :style="{width}" class="form-control">

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
