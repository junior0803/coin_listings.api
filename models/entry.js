"use strict";

module.exports = function(sequelize, DataTypes) {
    var entry = sequelize.define("entry", {
        // column in init migration path
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        address: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    });
    return entry;
};