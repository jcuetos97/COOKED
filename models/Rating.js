const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Rating extends Model {}

Rating.init(
    {
        likes: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id',
            }            
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }            
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'rating',
    }
);

module.exports = Rating;