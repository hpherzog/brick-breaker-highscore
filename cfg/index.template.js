'use strict';

var _ = require('lodash');
process.env.DEBUG = 'bin:*,server:*';

module.exports.config = {

    http: {
        port: _.get(process.env, 'PORT' , 3000)
    },

    db: {
        dsn: _.get(process.env, 'DB_DSN' , 'mysql://user:****@localhost:32769/brick_breaker_highscore')
    },

    app: {
        secret: _.get(process.env, 'APP_SECRET' , 'secret')
    }
};
