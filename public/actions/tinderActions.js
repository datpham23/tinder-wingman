import Constants      from '../constants/TinderConstants';
import * as API       from '../api/api';
import _              from 'lodash';
import co             from 'co';
var socket = require('socket.io-client')('/');


export const getState = ()=>{
  return (dispatch, state)=>{
    API.getState().then(res=>{
      dispatch({
        type : Constants.RECEIVED_STATE,
        state : res.entity
      })
    }).catch(res=>{
      console.log('error')
    })
  }
}

export const toggleSwiping = ()=>{
  return (dispatch, state)=>{
    if(state().tinder.toJS().isSwiping)
      API.stopSwiping().then(res=>{
        dispatch({
          type : Constants.TOGGLE_SWIPING
        });
      })
    else
      API.startSwiping().then(res=>{
        dispatch({
          type : Constants.TOGGLE_SWIPING
        });
      })
  }
}


export const getSwipes = ()=>{
  return (dispatch, state)=>{
    let tinderStore = state().tinder.toJS();


    if(!tinderStore.isFetchingSwipes)
      dispatch({
        type : Constants.FETCHING_SWIPES
      });
      API.getSwipes(tinderStore.profiles.length,tinderStore.profiles.length+20).then(res=>{
        dispatch({
          type : Constants.RECEIVED_SWIPES,
          profiles : res.entity
        })
      })
  }
}

export const getHistory = ()=>{
  return (dispatch, state)=>{
    let tinderStore = state().tinder.toJS();

    dispatch({
      type : Constants.FETCHING_HISTORY
    });

    co(function*(){
      let history = (yield API.getHistory()).entity;
      history.matches.forEach(match=>{
        let index = _.findIndex(tinderStore.matches, { '_id': match.person._id});
        if(index<0)
          API.getUser(match.person._id).then(res=>{
            dispatch({
              type : Constants.RECEIVED_MATCH_PROFILE,
              profile : res.entity.results
            });
          })
      })
    })
  }
}

export const openSockets = ()=>{
  return (dispatch, state)=>{
    socket.on('connect', function(){
      console.log('connected to socket')
    });
    socket.on('new-profiles', (profiles)=>{
      dispatch({
        type : Constants.RECEIVED_SWIPES_FROM_SOCKETS,
        profiles : profiles
      });
    });
  }
}
