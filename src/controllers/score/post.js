'use strict';

var $ = require('chai').assert;
var logger = require('debug-logger')('server:score:post');

module.exports.controller = function controller (options){
    $.property(options, 'db');
    var Score = options.db.getModel('score');
    return function(req, res, next) {
        Score.create(req.body).then((score)=>{
           logger.info('Created score name=%s value=%s level=%s', score.name, score.value, score.level);
           res.status(201).json(score);
        }).catch((err)=>{
            next(err);
        });
    }
};
