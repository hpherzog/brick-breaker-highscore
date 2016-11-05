'use strict';

var Sequelize = require('sequelize');
var url = require('url');
var _ = require('lodash');
var $ = require('chai').assert;
var logger = require('debug-logger')('server:db');
var models = require('../models');

class Db {

    constructor(options) {
        $.deepProperty('db.dsn');
        this.dsn = _.get(options, 'db.dsn');
        this.forceSync = _.get(options, 'db.forceSync', false);
    }

    init() {
        return new Promise((resolve, reject)=>{
            this.sequelize = new Sequelize(this.dsn, {
                logging: false
            });
            this.sequelize.authenticate().then(()=>{
                logger.info('Connected:', this.getFormattedDsn());
                _.forEach(models, (model, modelName)=>{
                    model.define({
                        sequelize: this.sequelize
                    });
                    logger.info('Added model:', modelName);
                });
                resolve();
            }).catch((err)=>{
                reject(err);
            });
        });
    }

    sync() {
        return this.sequelize.sync({
            force: this.forceSync
        });
    }

    getFormattedDsn() {
        var parsedDsn = url.parse(this.dsn, true);
        if(_.isString(parsedDsn.auth)) {
            parsedDsn.auth = parsedDsn.auth.split(':')[0] + ':*****';
        }
        return url.format(parsedDsn);
    }
}

module.exports.Db = Db;
