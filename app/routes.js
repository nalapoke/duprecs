var express = require('express');
var Discogs = require('disconnect').Client;
var router = express.Router();

var CONSUMER_KEY = 'HWHrugEFavJOPDLIMcNo';
var CONSUMER_SECRET = 'ctkjFILedHMqMmSkAfXNXEJtrRQvmRjB';
var discogsAuthRequestData = {
  consumerKey: CONSUMER_KEY,
  consumerSecret: CONSUMER_SECRET
};
var oAuthAuthorizeData, oAuthRequestData;

function getUserAgent() {
  var userAgent = 'Duprecs/';
  userAgent += process.env.npm_package_version ? process.env.npm_package_version : '0.0';
  return userAgent;
}

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

router.get('/api/v1/authorize',
  function (req, res) {
    var oAuth = new Discogs().oauth();
    oAuth.getRequestToken(
        CONSUMER_KEY,
        CONSUMER_SECRET,
        getHost(req) + '/api/v1/authorize/callback',
        function (err, data){
          if (err) {
            res.send(err);
          }
          oAuthAuthorizeData = data;
          res.redirect(oAuthAuthorizeData.authorizeUrl);
        }
    );
  });

router.get('/api/v1/authorize/callback',
  function (req, res) {
    if (!oAuthAuthorizeData) {
      // Todo: handle unauthorized case.
    }
    var oAuth = new Discogs(oAuthAuthorizeData).oauth();
    oAuth.getAccessToken(
        req.query.oauth_verifier, // Verification code sent back by Discogs
        function (err, accessData){
          if (err) {
            res.send(err);
          }
          // Persist "accessData" here for following OAuth calls
          oAuthRequestData = accessData;
          res.status(200).json({ ok: true });
        }
    );
  });

//-------------------------------------
//       Discogs User Identity
//-------------------------------------

router.get('/api/v1/identity',
  function (req, res) {
    if (!oAuthRequestData) {
      // Todo: handle unauthorized case.
    }
    var disc = new Discogs(oAuthRequestData);
    disc.identity(
        function (err, data) {
          if (err) {
            res.send(err);
          }
          res.send(data);
        }
    );
  });

//-------------------------------------
//       Discogs User Profile
//-------------------------------------

router.get('/api/v1/users/:username',
  function (req, res) {
    var discUser = new Discogs(getUserAgent(), discogsAuthRequestData).user();
    discUser.profile(
        req.params.username,
        function (err, data) {
          if (err) {
            res.send(err);
          }
          res.send(data);
        }
    );
  });

//-------------------------------------
//        Discogs Collections
//-------------------------------------

router.get('/api/v1/users/:username/collection/folders/:folder_id/releases',
  function (req, res) {
    var pagination = {
      page: req.query.page || 1,
      per_page: req.query.per_page || 50
    };
    var discCollection = new Discogs(getUserAgent(), discogsAuthRequestData).user().collection();
    discCollection.releases(
        req.params.username,
        req.params.folder_id,
        pagination,
        function (err, data) {
          if (err) {
            res.send(err);
          }
          res.send(data);
        }
    );
  });

//-------------------------------------
//      Default catch-all route
//-------------------------------------

router.get('*', function (req, res) {
  res.sendFile(__dirname + 'public/index.html');
});

module.exports = router;
