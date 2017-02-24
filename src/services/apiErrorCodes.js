import Constants from 'src/constants';
import {
  FetchError
} from 'src/errors';

const knownCodes = {
  302: 'Redirect',
  400: 'Validation',
  401: {
    message: 'Unauthorized',
    actions: [Constants.LOGOUT],
  },
  403: 'Forbidden',
  405: 'Not Implemented',
  500: {
    message: 'Server Error',
    actions: [],
    formatter: m => m,
  },
};

/*
  Returns a function that handles the given error code.
  If there is no error, returns a NOOP-equivalent function.
 */
export default function getErrorCodeHandler({
  dispatch,
  response,
  json,
}) {
  const {
    statusCode
  } = response;
  const handler = knownCodes[statusCode];
  if (handler) {
    if (typeof handler === 'string') {
      return () => {
        throw new FetchError(json, handler);
      };
    } else if (typeof handler === 'object') {
      return () => {
        const {
          actions,
          formatter,
        } = handler;
        let {
          message
        } = handler;
        if (actions) {
          actions.map(x => dispatch(x));
        }
        if (formatter) {
          message = formatter(message);
        }
        throw new FetchError(json, message);
      };
    }
  }

  return () => {};
}
