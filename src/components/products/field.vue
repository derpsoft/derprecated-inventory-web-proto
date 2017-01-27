<script>
import _ from 'lodash';
import Constants from '../../constants';

/**
 * Load and display an element containing single field from a product.
 *
 * Sample use:
 *   <product-field tag="td" :id="log.productId" field="title"></product-field>
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
    product() {
      return this.$store.getters.product(this.id);
    },
    value() {
      return _.merge({
        [this.field]: this.defaultValue
      }, this.product)[this.field];
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
      if (this.load && !this.product) {
        this.$store.dispatch(Constants.GET_PRODUCT, {
          id: this.id,
          includeDeleted: true,
          toastError: false,
        });
      }
    }
  },

};
</script>
