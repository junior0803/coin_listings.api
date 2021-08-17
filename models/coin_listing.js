"use strict";

module.exports = function(sequelize, DataTypes) {
    var coin_listing = sequelize.define("coin_listing", {
        // column in init migration path
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        entry_id: {
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
        },
        
        symbol: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        marketcap: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.STRING,
        },
        available_supply: {
            type: DataTypes.STRING,
        },
        transaction: {
            type: DataTypes.STRING,
        },
        holders: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    });
    return coin_listing;
};