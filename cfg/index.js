'use strict';

var _ = require('lodash');
process.env.DEBUG = 'bin:*,server:*';

module.exports.config = {

    http: {
        port: _.get(process.env, 'PORT' , 3000)
    },

    db: {
        dsn: _.get(process.env, 'DB_DSN' , 'mysql://root:123456@192.168.99.100:32768/brick_breaker_highscore')
    },

    app: {
        secret: _.get(process.env, 'APP_SECRET' , 'secret')
    }
};
