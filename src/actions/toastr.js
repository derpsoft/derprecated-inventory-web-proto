import log from 'loglevel';
import toastr from 'toastr';
import Constants from 'src/constants';

const options = {
  closeButton: true,
  debug: false,
  newestOnTop: true,
  progressBar: true,
  positionClass: 'toast-top-center',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '5000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut'
};

function isValidType(type) {
  if (!type) {
    return false;
  }

  switch (type.toLowerCase()) {
    case 'info':
    case 'error':
    case 'success':
    case 'warning':
      return true;
    default:
      return false;
  }
}

function showToastr(state, {
  type,
  message
}) {
  if (isValidType(type)) {
    toastr.options = options;
    toastr[type](message);
  } else {
    log.error('Invalid Type');
  }
}

const INITIAL_STATE = {};

const ACTIONS = {
  [Constants.SHOW_TOASTR]: showToastr,
};

const MUTATIONS = {};

const GETTERS = {};

const ToastrActions = {
  ACTIONS,
  MUTATIONS,
  INITIAL_STATE,
  GETTERS
};

export default ToastrActions;
