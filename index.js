'use strict';

var config = require(__dirname + '/src/config').config;
var Server = require(__dirname + '/src/server').Server;
var logger = require('debug-logger')('server:bootstrap');
var server = new Server(config);

server.init().then(()=>{
    logger.info('Started');
}).catch((err)=>{
    logger.error(err);
    process.exit(1);
});
