var express = require('express');
var router = express.Router();
var co = require('co');
var config = require('../../config');
var tinder = require('../api/tinder');
var winston = require('winston');
var r = require('rethinkdbdash')();
var app = require('../../devServer');


const db = 'wingman';
const table = 'profiles';

var timer;
var state = {
  isSwiping : false
}


const startJob = ()=>{
  var job = ()=>{
    co(function*(){
      var profiles = (yield tinder.getRecommendations()).results;
      console.log('received profiles', profiles)
      winston.debug('Received Profiles');
      winston.debug(JSON.stringify(profiles));
      global.io.emit('new-profiles', profiles);

      for(var i=0; i<profiles.length; i++){
        var profile = profiles[i];

        //Ran out of swipes if name = 'Tinder Team'
        var outOfSwipes = profile.name === 'Tinder Team';

        if(!outOfSwipes){
          yield tinder.like(profile._id);
          winston.debug(`Liked Profile ${profile._id}`);
          profile.timestamp = new Date();
          yield r.db(db)
            .table(table)
            .insert(profile)
            .run();
          winston.debug(`Inserted Profile ${profile._id}`);
        }else {
          winston.debug(`Out of swipes`);
        }
      }

    }).catch(error=>{
      winston.debug('Something went wrong ');
      winston.debug(JSON.stringify(error));
    });
  }
  job();
  timer = setInterval(job,60000);
}




const stopJob = ()=>{
  clearInterval(timer);
}

router.get('/authenticate', (req, res) => {
  tinder.authenticate().then(result=>{
    res.send(result);
  }).catch(result=>{
    res.status(500).send('Authentication Failed '+result)
  });
});

router.get('/recommendations', (req, res) => {
  tinder.getRecommendations().then(result=>{
    res.send(result);
  }).catch(result=>{
    res.status(500).send(result.entity);
  });
});

router.get('/history', (req, res) => {
  tinder.getHistory().then(result=>{
    res.send(result);
  }).catch(result=>{
    res.status(500).send('Request Failed '+result)
  });
});

router.get('/user/:id', (req, res) => {
  tinder.getUser(req.params.id).then(result=>{
    res.send(result);
  }).catch(result=>{
    res.status(500).send('Request Failed '+result)
  });
});


router.get('/is-swiping', (req, res) => {
  res.send(state);
});

router.get('/start-swiping', (req, res) => {
  state.isSwiping = true;
  res.send('Started Swiping');
  startJob();
});

router.get('/stop-swiping', (req, res) => {
  state.isSwiping = false;
  stopJob();
  res.send('Stopped Swiping');
});

router.get('/swiped/profiles',(req,res)=>{
  r.db(db)
    .table(table)
    .orderBy(r.desc('timestamp'))
    .slice(parseInt(req.query.startRange),parseInt(req.query.endRange))
    .run().then(results=>{
      res.send(results)
    });
});



module.exports = router;
