'use strict';

var config = require(__dirname + '/cfg').config;
var Server = require(__dirname + '/src/server').Server;
var Db = require(__dirname + '/src/db').Db;
var logger = require('debug-logger')('server:bootstrap');
var server = new Server(config);
var db = new Db(config);

db.init().then(()=>{
    return server.init({
        db: db
    });
}).catch((err)=>{
    logger.error(err);
    process.exit(1);
});
