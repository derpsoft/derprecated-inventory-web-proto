// @flow
import _ from 'lodash';
import store from 'stores/store';
import Constants from 'src/constants';

export default (Vue: Object) => {
  /**
   * Inject a product field into the innerText of this element.
   * Sample use:
   *   <td v-product-field="{id:productId, field:'title'}"></td>
   * Resulting HTML:
   *   <td>{{title}}</td>
   */
  Vue.directive('productField', {
    bind: (el: Object, binding: Object) => {
      const {
        id,
        field,
        load,
        defaultValue,
      } = _.merge({
        load: true,
        defaultValue: 'loading...',
      }, binding.value);

      const getProduct = x => _.merge({
        [field]: defaultValue
      }, store.getters.product(x));

      store.watch(
        () => store.getters.product(id),
        (product) => {
          el.innerText = product[field];
        }
      );

      el.innerText = getProduct(id)[field];

      if (load && !store.getters.product(id)) {
        store.dispatch(Constants.GET_PRODUCT, {
          id,
          includeDeleted: true,
          toastError: false,
        });
      }
    }
  });
};
