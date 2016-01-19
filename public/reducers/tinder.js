import Constants           from '../constants/TinderConstants';
import Immutable           from 'immutable';
import _                   from 'lodash';


let initialState = {
  isSwiping: false,
  isFetchingSwipes : false,
  isFetchingHistory : false,
  noMoreSavedSwipes : false,
  networkError: false,
  errorMessage : '',
  profiles : [],
  matches : []
}


module.exports  = function(state = Immutable.fromJS(initialState), action) {
  switch (action.type) {
    case Constants.RECEIVED_STATE:
      return state.set('isSwiping', action.state.isSwiping);
    case Constants.TOGGLE_SWIPING:
      return state.set('isSwiping', !state.get('isSwiping'));
    case Constants.FETCHING_SWIPES:
      return state.set('isFetchingSwipes', true);
    case Constants.RECEIVED_SWIPES:
      return receivedSwipes(state,action);
    case Constants.RECEIVED_SWIPES_FROM_SOCKETS:
      return receivedSwipesFromSockets(state,action);
    case Constants.FETCHING_HISTORY:
      return state.set('isFetchingHistory', true);
    case Constants.RECEIVED_MATCH_PROFILE:
      return receivedMatchProfile(state,action);
    default:
      return state
  }
}


const receivedSwipes = (state,action)=>{
  let newState = state.toJS();
  newState.isFetchingSwipes = false;
  newState.profiles = newState.profiles.concat(action.profiles);
  return Immutable.fromJS(newState);
}


const receivedSwipesFromSockets = (state,action)=>{
  let newState = state.toJS();
  newState.isFetchingSwipes = false;
  newState.profiles =  action.profiles.concat(newState.profiles);
  return Immutable.fromJS(newState);
}

const receivedMatchProfile = (state,action)=>{
  let newState = state.toJS();
  newState.matches.push(action.profile)
  return Immutable.fromJS(newState);
}
