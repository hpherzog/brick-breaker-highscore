'use strict';

var http = require('http');
var _ = require('lodash');
var $ = require('chai').assert;
var config = require('./config').config;
var express = require('express');
var logger = require('debug-logger')('server:http');

/**
 * @class
 */
class Server {

    constructor(options) {
        this.port = _.get(options, 'http.port', 3000);
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
            this.app.all('/', (req, res)=>{
                res.json({message:'Welcome ;-)'});
            });
            logger.info('Configured express app');
            resolve();
        });
    }
}

module.exports.Server = Server;
