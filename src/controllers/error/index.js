'use strict';

var logger = require('debug-logger')('server:error');
var errorResponse = require('./response');
var errorMap = require('./map');

module.exports.controller = function controller (){
    return function(err, req, res, next) {
        if (err.name === 'SequelizeValidationError') {
            errorResponse.badRequest(res, errorMap.sequelize.validationError(err));
        } else if(err.name === 'SequelizeDatabaseError') {
            logger.debug(err);
            errorResponse.badRequest(res, [{
                name: 'invalidData',
                context: 'body'
            }]);
        } else if (err instanceof SyntaxError){
            errorResponse.badRequest(res, [{
                name: 'invalidJson',
                context: 'body'
            }]);
        } else {
            logger.error(err);
            errorResponse.notFound(res);
        }
    }
};
