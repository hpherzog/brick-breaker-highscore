'use strict';

var logger = require('debug-logger')('server:error');
var errorResponse = require('./response');
var errorMap = require('./map');

module.exports.notFound = function notFound() {
    return function(req, res, next) {
        errorResponse.notFound(res);
    }
};

module.exports.error = function error (){
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
