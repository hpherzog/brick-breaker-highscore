'use strict';

var http = require('http');
var _ = require('lodash');
var $ = require('chai').assert;
var express = require('express');
var logger = require('debug-logger')('server:http');
var routes = require('./routes').routes;
var bodyParser = require('body-parser');
var errorController = require('./controllers/error').controller;

/**
 * @class
 */
class Server {

    constructor(options) {
        options = options || {};
        $.deepProperty(options, 'http.port');
        $.isNotNaN(parseInt(options.http.port));
        this.port = parseInt(options.http.port);
        this.http = null;
        this.app = express();
    }

    init(options) {
        return new Promise((resolve, reject)=>{
            this.initExpress(options).then(()=>{
                return this.initHttp(options);
            }).then(()=>{
                logger.info('Started', this.http.address());
                resolve();
            }).catch((err)=>{
                reject(err);
            });
        });
    }

    initHttp() {
        return new Promise((resolve, reject)=>{
            $.isNumber(this.port);
            this.http = http.createServer(this.app);
            this.http.listen(this.port, (err)=>{
                if(_.isObject(err)) {
                    reject();
                } else {
                    resolve();
                }
            });
        });
    }

    initExpress(options) {
        return new Promise((resolve, reject)=>{
            $.property(options, 'db');
            this.app.use(bodyParser.json());
            _.forEach(routes, (route)=>{
                this.app[route[0]](route[1], route[2]({
                    db: options.db
                }));
                logger.info('Route:', route);
            });
            this.app.use(errorController());
            logger.info('Configured express app');
            resolve();
        });
    }
}

module.exports.Server = Server;
