'use strict';

var _ = require('lodash');
var $ = require('chai').assert;
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
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 64]
            },
            set: function (name) {
                this.setDataValue('name', _.trim(name).replace(/\s+/,' '));
            },
        },

        value: {
            type: Sequelize.BIGINT,
            allowNull: false,
            validate: {
                isInt: true,
                min: 0
            },
            set: function (value) {
                this.setDataValue('value', parseInt(value));
            },
        },

        level: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 1
            },
            set: function (level) {
                this.setDataValue('level', parseInt(level));
            },
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
