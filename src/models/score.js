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
                this.setDataValue('name', _.trim(name));
            },
        },

        value: {
            type: Sequelize.BIGINT,
            allowNull: false,
            validate: {
                min: 0
            }
        },

        level: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
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
