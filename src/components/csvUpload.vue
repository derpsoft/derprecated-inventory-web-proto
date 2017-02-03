<template>
<div>
  <div>
    <button class="btn btn-primary" @click="prompt">Upload</button>
  </div>
  <input type="file" class="hide" accept="text/csv" multiple="false" @change="readFile">
</div>
</template>

<script>
import csv from 'csv';

export default {

  components: {},

  props: {
    transform: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      showUpload: false,
    };
  },

  computed: {
    input() {
      return this.$el.querySelector('input[type=file]');
    },
    file() {
      const {
        files
      } = this.input;

      if (files && files.length) {
        return files[0];
      }
      return null;
    },
  },

  watch: {
    filename: 'readFile',
  },

  methods: {
    prompt() {
      this.input.click();
    },

    readFile() {
      if (this.file) {
        const records = [];
        const reader = new FileReader();
        const parser = csv.parse({
          columns: true,
          skip_empty_lines: true,
        });
        const transformer = csv.transform((data) => {
          return this.transform(data);
        });

        parser.pipe(transformer);

        reader.onload = (e) => {
          parser.write(e.target.result);
          parser.end();
        };

        transformer.on('readable', () => {
          let data = transformer.read();

          while (data) {
            records.push(data);
            data = transformer.read();
          }
        });

        transformer.on('finish', () => {
          this.$emit('done', records);
        });

        reader.readAsText(this.file);
      }
    },
  },
};
</script>
