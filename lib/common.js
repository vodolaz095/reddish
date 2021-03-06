// Generated by CoffeeScript 1.3.3
(function() {
  var Pool, redback, redis, redis_auth;

  var config = require('../config');

  exports.redis = redis = require('redis').createClient(
      config.redis_port,
      config.redis_host);

  redis.on('error', function(err) {
    return console.error(err);
  });

  if (config.redis_password) {
    redis.auth(config.redis_password, function(err) {
        console.error('Error! Unable to authenticate redis session storage! In config.json set redis_auth as value of requirepass in /etc/redis.conf!')
        return console.error(err)
    });
  }

  exports.redback = redback = require('redback').createClient();

  redback.client.on('error', function(err) {
    return console.error(err);
  });

  if (redis_auth) {
    redback.client.auth(redis_auth);
  }

  exports.proxies_set = redback.createSet('keys:connections');

  Pool = require('./pool');

  exports.proxies = new Pool();

}).call(this);
