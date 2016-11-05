'use strict';

module.exports.controller = function controller (){

    return function(req, res, next) {
        res.json({
            items: []
        });
    }
};
