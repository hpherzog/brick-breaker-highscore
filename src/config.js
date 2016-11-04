'use strict';

process.env.DEBUG = 'server:*';

module.exports.config = {

    http: {
        port: process.env.PORT || 3000
    },

    db: {
        dsn: process.env.DB_DSN || ''
    },

    app: {
        secret: process.env.APP_SECRET || 'foo'
    }
};
