var express = require('express');
var Discogs = require('disconnect').Client;
var router = express.Router();

var CONSUMER_KEY = 'HWHrugEFavJOPDLIMcNo';
var CONSUMER_SECRET = 'ctkjFILedHMqMmSkAfXNXEJtrRQvmRjB';
var authorizeData, requestData;


function getHost(req) {
  var host = req.protocol + '://' + req.hostname;
  if (req.app.get('port')) {
    host += ':' + req.app.get('port');
  }
  return host;
}

//-------------------------------------
//        Discogs Authentication
//-------------------------------------

router.get('/api/v1/discogs/authorize',
  function (req, res) {
    var oAuth = new Discogs().oauth();
    oAuth.getRequestToken(
        CONSUMER_KEY,
        CONSUMER_SECRET,
        getHost(req) + '/api/v1/discogs/authorize/callback',
        function(err, data){
          if (err) {
            res.send(err);
          }
          authorizeData = data;
          res.redirect(authorizeData.authorizeUrl);
        }
    );
  });

router.get('/api/v1/discogs/authorize/callback',
  function (req, res) {
    var oAuth = new Discogs(authorizeData).oauth();
    oAuth.getAccessToken(
        req.query.oauth_verifier, // Verification code sent back by Discogs
        function(err, accessData){
          if (err) {
            res.send(err);
          }
          // Persist "accessData" here for following OAuth calls
          requestData = accessData;
          res.status(200).json({ ok: true });
        }
    );
  });


//-------------------------------------
//      Default catch-all route
//-------------------------------------

router.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

module.exports = router;
