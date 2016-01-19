[Demo](https://www.youtube.com/watch?v=SPjcE8Y0EAY)

# Overview
Automate swipe rights. Record swipes. 

##Config
Get facebook id [https://developers.facebook.com/tools/explorer](https://developers.facebook.com/tools/explorer)
![alt tag](https://raw.githubusercontent.com/datpham23/tinder-wingman/master/docs/id.png)


Get auth token [generate token](https://www.facebook.com/dialog/oauth?client_id=464891386855067&redirect_uri=https://www.facebook.com/connect/login_success.html&scope=basic_info,email,public_profile,user_about_me,user_activities,user_birthday,user_education_history,user_friends,user_interests,user_likes,user_location,user_photos,user_relationship_details&response_type=token)
```
Config.js
module.exports = {
  facebookId : 'your_fb_id',
  accessToken : 'your_token'
};
```


## Run
```bash
$ bash scripts/setup.sh
$ npm install
$ node db/create.js
$ npm start
```

## References

* (nodemon)[https://github.com/remy/nodemon]
* (node-foreman)[https://github.com/strongloop/node-foreman]
* (rethinkdbdash)[https://github.com/neumino/rethinkdbdash]
