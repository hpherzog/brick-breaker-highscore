'use strict';

var http = require('http');
var _ = require('lodash');
var $ = require('chai').assert;
var express = require('express');
var logger = require('debug-logger')('server:http');
var routes = require('./routes').routes;

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

    init() {
        return new Promise((resolve, reject)=>{
            this.initExpress().then(()=>{
                return this.initHttp();
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

    initExpress() {
        return new Promise((resolve, reject)=>{

            _.forEach(routes, (route)=>{
                this.app[route[0]](route[1], route[2]());
                logger.info('Route:', route);
            });

            logger.info('Configured express app');
            resolve();
        });
    }
}

module.exports.Server = Server;
