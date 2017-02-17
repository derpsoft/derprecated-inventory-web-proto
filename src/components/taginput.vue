<style scoped>
.tags {
  .tag {
    border: solid 1px white;
    padding: 3px;
  }
}

</style>

<template>
<div class="tags">
  <span class="tag" v-for="(tag, i) in source">
    {{tag}} <span @click="removeTag()">x</span> {{ i == this.index ? '|' : '' }}
  </span>
  <input type="text" v-model="newTag" @keydown.space="addTag" @keydown.backspace="deleteTag"
      @keydown.left="left" @keydown.right="right" />
</div>

</template>

<script>
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
    tags: 'refresh'
  },

  methods: {
    refresh() {
      this.source = this.tags;
    },
    typing() {

    },
    addTag() {
      if (this.newTag.length) {
        this.index += 1;
        this.source.splice(this.index, 0, this.newTag);
        this.newTag = '';
      }
    },
    deleteTag() {
      if (~this.index) {
        this.source.splice(this.index, 1);
        this.index -= 1;
      }
    },
    left() {
      this.index = Math.max(0, this.index - 1);
    },
    right() {
      this.index = Math.min(this.source.length, this.index + 1);
    },
  },
};

</script>
