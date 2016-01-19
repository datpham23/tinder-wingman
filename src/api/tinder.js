var rp = require('request-promise');
var config = require('../../config');
var tinderHost = "https://api.gotinder.com";
var headers = {
  'User-Agent' : 'Tinder Android Version 2.2.3',
  'os_version' : '16'
}
var profile = null;

module.exports = {
  authenticate: ()=>{
    return new Promise((resolve, reject)=>{
      if(profile){
        resolve(profile)
      }else{
        rp({
          method: 'POST',
          uri: `${tinderHost}/auth`,
          headers : headers,
          body: {
            facebook_token: config.accessToken,
            facebook_id: config.facebookId
          },
          json: true
        }).then(response=>{
          headers['X-Auth-Token'] = response.token;
          profile = response;
          resolve(response);
        }).catch(response=>{
          reject(response)
        })
      }
    });
  },
  getRecommendations : (limit)=>{
    return rp({
      method: 'GET',
      uri: `${tinderHost}/recs`,
      headers : headers,
      body : {
        limit : limit? limit : 50
      },
      json: true
    });
  },
  like: (id)=>{
    return rp({
      method: 'GET',
      uri: `${tinderHost}/like/${id}`,
      headers : headers,
      json: true
    });
  },
  getHistory: ()=>{
    return rp({
      method: 'POST',
      uri: `${tinderHost}/updates`,
      headers : headers,
      body : {
        last_activity_date: ""
      },
      json: true
    });
  },
  getUser: (id)=>{
    return rp({
      method: 'GET',
      uri: `${tinderHost}/user/${id}`,
      headers : headers,
      json: true
    });
  },
  getLocation: ()=>{
    return rp({
      method: 'POST',
      uri: `${tinderHost}/ping`,
      json: true
    });
  }
}
