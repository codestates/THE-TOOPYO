'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class content extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    content.init(
        {
<<<<<<< HEAD
            //user_id: DataTypes.INTEGER,
=======
            userId: DataTypes.INTEGER,
>>>>>>> 61110cdc8e7dac7f5addca3aafb7e2ab8e9f33c0
            title: DataTypes.STRING,
            picture_1: DataTypes.STRING,
            picture_2: DataTypes.STRING,
            description: DataTypes.STRING,
            voting_deadline: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'content',
        },
    );
    return content;
};
