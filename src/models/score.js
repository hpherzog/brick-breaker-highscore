'use strict';

var $ = require('chai').assert;
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports.define = function define(options) {

    var sequelize = options.sequelize;

    sequelize.define('score', {

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },

        name: {
            type: Sequelize.STRING,
            allowNull: false
        },

        value: {
            type: Sequelize.BIGINT,
            allowNull: false
        },

        level: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        classMethods: {

            saveScore(options) {
                $.property(options, 'name');
                $.property(options, 'value');
                $.property(options, 'level');

                var Score = sequelize.models.score;
                return Score.create(options);
            },

            getTop10(options) {

            }
        }
    });
};
