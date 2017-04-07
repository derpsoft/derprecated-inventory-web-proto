// @flow
import _ from 'lodash';
import store from 'stores/store';
import Constants from 'src/constants';

export default (Vue: Object) => {
  /**
   * Inject a user field into the innerText of this element.
   * Sample use:
   *   <td v-user-field="{id:userId, field:'title'}"></td>
   * Resulting HTML:
   *   <td>{{title}}</td>
   */
  Vue.directive('userField', {
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

      const getUser = x => _.merge({
        [field]: defaultValue
      }, store.getters.user(x));

      store.watch(
        () => store.getters.user(id),
        (user) => {
          el.innerText = user[field];
        }
      );

      el.innerText = getUser(id)[field];

      if (load && !store.getters.user(id)) {
        // $FlowFixMe
        store.dispatch(Constants.GET_USER, {
          id,
          includeDeleted: true,
          toastError: false,
        });
      }
    }
  });
};
