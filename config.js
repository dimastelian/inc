'use strict';

var convict = require('convict');
var path = require('path');

var conf = convict({
  env: {
    doc: "The applicaton environment.",
    format: ["production", "development", "staging"],
    default: "development",
    env: "NODE_ENV",
    arg: "env",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8000,
    env: "PORT",
    arg: "port",
  },
  app: {
    
  },
  redis: {
      host: {
          format: String,
          default: process.env.IP,
          env: 'REDIS_HOST',
          arg: 'redis_host'
      },
      port: {
          format: 'port',
          default: 6379,
          env: 'REDIS_PORT',
          arg: 'redis_port'
      },
      password: {
          format: String,
          default: undefined,
          env: 'REDIS_PASSWORD',
          arg: 'redis_password'
      }
  },
  mongo: {
      url: {
          format: String,
          default: "mongod://"+process.env.IP,
          env: 'MONGO_URL',
          arg: 'mongo_url'
      }
  },
  cookie: {
    domain: {
        format: String,
        default: '.inc-game.com',
        env: 'COOKIE_DOMAIN',
        arg: 'cookie_domain'
    },
  	key: {
        format: String,
        default: 'express.sid',
        env: 'COOKIE_KEY',
        arg: 'cookie_key'
    },
  	secret: {
        format: String,
        default: '923iWE(R)I@#$RI$2304i0r4j#$j34jow03r93rj34r#93j4F#)94034r2',
        env: 'COOKIE_SECRET',
        arg: 'cookie_secret'
    },
  }
});

let commonConfig = path.join(__dirname, `config/common.json`);
// load environment dependent configuration
let envConfig = path.join(__dirname, `config/${conf.get('env')}.json`);
conf.loadFile([commonConfig, envConfig]);

// validate
conf.validate();

// set devMode
conf.inDevelopment = (conf.get('env') == 'development');
conf.inStaging = (conf.get('env') == 'staging');
conf.inProduction = (conf.get('env') == 'production');

module.exports = conf;