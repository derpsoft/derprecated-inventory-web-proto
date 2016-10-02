import Fetchable from './fetchable';
import store from '../stores/store';
import Constants from '../constants';
import _ from 'lodash';

class MemberApi extends Fetchable {
  constructor() {
    super(Constants.API_ROOT, store);
  }
}
