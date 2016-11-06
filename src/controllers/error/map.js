'use strict';

var _ = require('lodash');

module.exports = {

    sequelize: {
        validationError: function validationError(err) {
            var errors = [];
            _.forEach(err.errors, (error)=>{
                errors.push({
                    name: _.camelCase(error.type),
                    path: error.path,
                    context: 'body'
                });
            });
            return errors;
        }
    }
};
