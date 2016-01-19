import rest from '../utils/rest';

export const authenticate = ()=>{
  return rest({
    path : '/tinder/authenticate'
  })
}

export const getState = ()=>{
  return rest({
    path : '/tinder/is-swiping'
  })
}

export const startSwiping = ()=>{
  return rest({
    path : '/tinder/start-swiping'
  })
}

export const stopSwiping = ()=>{
  return rest({
    path : '/tinder/stop-swiping'
  })
}


export const getSwipes = (startRange,endRange)=>{
  return rest({
    path : '/tinder/swiped/profiles',
    params : {
      startRange  : startRange,
      endRange : endRange
    }
  })
}

export const getHistory = ()=>{
  return rest({
    path : '/tinder/history'
  })
}

export const getUser = (id)=>{
  return rest({
    path : `tinder/user/${id}`
  })
}
