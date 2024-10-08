'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Feedback extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Feedback.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'dataFeedbackUser'})
            Feedback.belongsTo(models.Review, { foreignKey: 'reviewId', targetKey: 'id', as: 'dataFeedbackReview'})
        }
    }
    Feedback.init({
        reviewId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        content: DataTypes.TEXT('long'),
        status: DataTypes.TINYINT,
    }, {
        sequelize,
        modelName: 'Feedback',
    });
    return Feedback;
};