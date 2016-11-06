'use strict';

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
            allowNull: false
        },

        value: {
            type: Sequelize.BIGINT,
            allowNull: false,
            validate: {
                min: {
                    args: 1,
                    msg: 'min'
                }
            }
        },

        level: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                min: {
                    args: 1,
                    msg: 'min'
                }
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
