import Constants           from '../constants/UserConstants';
import Immutable           from 'immutable';
import _                   from 'lodash';


let initialState = {
  isAuthenticating: false,
  authenticationError: false,
  errorMessage : '',
  profile : {}
}


module.exports  = function(state = Immutable.fromJS(initialState), action) {
  switch (action.type) {
    case Constants.AUTHENTICATING:
      return state.set('isAuthenticating',true)
    case Constants.AUTHENTICATED:
      return state.set('isAuthenticating',false).set('profile',action.user);
    case Constants.AUTHENTICATION_FAILURE:
      return state.mergeDeep({
        isAuthenticating : false,
        authenticationError : true
      });
    default:
      return state
  }
}
