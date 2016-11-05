'use strict';

var config = require(__dirname + '/../cfg').config;
var Db = require(__dirname + '/../src/db').Db;
var logger = require('debug-logger')('bin:db-sync');
var db = new Db(config);

db.init().then(()=>{
    return db.sync();
}).then(()=>{
    logger.info('Synced db schema');
}).catch((err)=>{
    logger.error(err);
    process.exit(1);
});
