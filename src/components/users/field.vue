<script>
import _ from 'lodash';
import Constants from 'src/constants';

/**
 * Load and display an element containing single field from a user.
 *
 * Sample use:
 *   <user-field tag="td" :id="log.userId" field="title"></user-field>
 * Resulting HTML:
 *   <td>{{title}}</td>
 */
export default {
  render(createElement) {
    return createElement(this.tag, {
      domProps: {
        innerText: this.value
      }
    });
  },

  props: {
    id: {
      type: Number,
      required: false,
    },
    field: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: false,
      default: 'span',
    },
    load: {
      type: Boolean,
      required: false,
      default: true,
    },
    defaultValue: {
      required: false,
      default: 'loading...'
    },
  },

  computed: {
    user() {
      return this.$store.getters.user(this.id);
    },
    value() {
      return _.merge({
        [this.field]: this.defaultValue
      }, this.user)[this.field];
    },
  },

  watch: {
    id: 'refresh',
  },

  mounted() {
    this.refresh();
  },

  methods: {
    refresh() {
      if (this.load && !this.user) {
        this.$store.dispatch(Constants.GET_USER, {
          id: this.id,
          includeDeleted: true,
          toastError: false,
        });
      }
    }
  },

};
</script>
