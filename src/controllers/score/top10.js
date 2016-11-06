'use strict';

var $ = require('chai').assert;
var logger = require('debug-logger')('server:score:top10');

module.exports.controller = function controller (options){
    $.property(options, 'db');
    var Score = options.db.getModel('score');
    return function(req, res, next) {
        Score.findAll({
            limit: 10,
            order: [
                ['value', 'DESC'],
                ['level', 'DESC']
            ]
        }).then((scores)=>{
            res.status(200).json({
                items: scores
            });
        }).catch((err)=>{
            next(err);
        });
    }
};
