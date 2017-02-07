import Constants from 'src/constants';

const knownCodes = {
  302: 'Redirect',
  400: 'Validation',
  401: {
    message: 'Unauthorized',
    actions: [Constants.LOGOUT],
  },
  403: 'Forbidden',
  405: 'Not Implemented',
  500: 'Server Error',
};

/*
  Returns a function that handles the given error code.
  If there is no error, returns a NOOP-equivalent function.
 */
export function getErrorCodeHandler({
  dispatch,
  code
}) {
  const handler = knownCodes[code];
  if (handler) {
    if (typeof handler == 'string') {
      return () => {
        throw new Error(handler);
      };
    } else if (typeof handler == 'object') {
      return () => {
        if (handler.actions) {
          handler.actions.map(dispatch);
        }
        throw new Error(handler.message);
      };
    }
  }
  return () => {};
};
